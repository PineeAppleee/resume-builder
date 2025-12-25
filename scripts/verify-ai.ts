
import dotenv from 'dotenv';
import path from 'path';

// Load .env explicitly
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function verifyKey() {
    const key = process.env.OPENROUTER_API_KEY;
    if (!key) {
        console.error("❌ OPENROUTER_API_KEY not found in process.env");
        process.exit(1);
    }

    // Mask key for safety log
    const masked = key.substring(0, 8) + '...';
    console.log(`🔑 Found Key: ${masked}`);

    const candidates = [
        "google/gemma-2-9b-it:free",
        "mistralai/mistral-7b-instruct:free",
        "meta-llama/llama-3.1-8b-instruct:free",
        "microsoft/phi-3-mini-128k-instruct:free",
        "huggingfaceh4/zephyr-7b-beta:free"
    ];

    for (const model of candidates) {
        console.log(`📡 Testing model: ${model}...`);
        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${key}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "ResumeCanvas Code Check"
                },
                body: JSON.stringify({
                    "model": model,
                    "messages": [
                        { "role": "user", "content": "Ping" }
                    ]
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(`✅ SUCCESS! Connected to: ${model}`);
                console.log(`Response: ${data.choices[0].message.content}`);
                console.log(`\n🎉 ACTION REQUIRED: Update your code to use "${model}"`);
                return; // Exit success
            } else {
                console.warn(`⚠️ Failed ${model}: ${response.status}`);
            }
        } catch (e) {
            console.warn(`❌ Error with ${model}:`, e);
        }
    }
    console.error("❌ All models failed. Check your API Key or OpenRouter status.");
    process.exit(1);
}

verifyKey();
