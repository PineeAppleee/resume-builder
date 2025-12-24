import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter an email and password');
                }

                await connectToDatabase();
                // @ts-ignore
                const user = await User.findOne({ email: credentials.email });

                if (!user || !user.password) {
                    throw new Error('No user found');
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) {
                    throw new Error('Incorrect password');
                }

                return { id: user._id.toString(), email: user.email, name: user.name };
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'credentials') {
                return true;
            }

            await connectToDatabase();
            // @ts-ignore
            const existingUser = await User.findOne({ email: user.email });

            if (existingUser) {
                // Here you might want to link the account if not already linked
                // For simplicity, we just allow sign in if email matches
                return true;
            }

            // Create new user for OAuth
            await User.create({
                name: user.name,
                email: user.email,
                image: user.image,
                provider: account?.provider,
            });

            return true;
        },
        async session({ session, token }) {
            if (token && session.user) {
                // @ts-ignore
                session.user.id = token.sub;
                session.userId = token.sub; // For backward compatibility with my custom auth check
            }
            return session;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
            }
            // If user signs in with OAuth, we can access the ID in token.sub usually
            return token;
        }
    },
    pages: {
        signIn: '/login', // Custom login page
        error: '/login', // Error code passed in query string as ?error=
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};
