// Strict AI Response Schema for Production
export interface AIResponse {
    replacement_text: string | object;   // "Text to insert" or JSON object for structured updates
    confidence_score: number;            // 0-100
    notes: string;                       // "Short explanation"
    skill_suggestions?: string[];        // Optional: specific skill suggestions
}

export interface AIRequest {
    currentSection: string;
    userText: string;
    targetRole: string;
    fullResumeContext?: any;
    task?: 'improve' | 'suggest' | 'summary' | 'fix';
}

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const SITE_NAME = 'ResumeCanvas Pro';

export const generateAIContent = async (req: AIRequest): Promise<AIResponse> => {
    if (!OPENROUTER_API_KEY) {
        console.warn('OpenRouter API Key missing. Falling back to mock response.');
        return mockAIResponse(req);
    }

    const systemPrompt = `You are an expert career coach and ATS resume reviewer.
    You help users improve resumes by rewriting content to be more impactful.
    
    CRITICAL RULES:
    1. NEVER fabricate experience / facts.
    2. Use strong action verbs.
    3. Return STRICT JSON only.
    4. If the section is 'Experience' or 'Personal Info', return the structured object if helpful, or text if it's a description.
    
    Output Format (Strict JSON):
    {
      "replacement_text": "The actual text/json to insert into the field",
      "confidence_score": 0-100,
      "notes": "Brief explanation of changes (max 1 sentence)",
      "skill_suggestions": ["Skill1", "Skill2"]
    }`;

    const userPrompt = `
    - Target Role: ${req.targetRole}
    - Section: ${req.currentSection}
    - Current Content: ${req.userText || "(Empty)"}
    
    Task: Rewrite/Improve this content to be ATS-friendly and high-impact.
    `;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "HTTP-Referer": SITE_URL,
                "X-Title": SITE_NAME,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "mistralai/mistral-7b-instruct:free",
                "messages": [
                    { "role": "system", "content": systemPrompt },
                    { "role": "user", "content": userPrompt }
                ],
                "response_format": { type: "json_object" }
            })
        });

        if (!response.ok) {
            throw new Error(`OpenRouter API Error: ${response.statusText}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;

        try {
            const parsed = JSON.parse(content);

            // Normalize response to ensure replacement_text exists
            if (!parsed.replacement_text && parsed.improved_text) {
                parsed.replacement_text = parsed.improved_text;
            }
            if (!parsed.notes && parsed.analysis) {
                parsed.notes = parsed.analysis;
            }

            // Ensure replacement_text is stringified if object, to prevent UI crash, 
            // OR keep it as object if we want ResumeBuilderClient to handle it as JSON.
            // Let's keep it flexible but safe:
            // Actually ResumeBuilderClient expects a string for text-based apply.
            // But for structured sync, we might want object. 
            // Let's standardize: If it's an object, stringify it so UI can display it, and JSON.parse can handle it later.
            if (parsed.replacement_text && typeof parsed.replacement_text === 'object') {
                // For complex objects, we pass them as string to avoid React rendering Error
                parsed.replacement_text = JSON.stringify(parsed.replacement_text, null, 2);
            }

            return {
                replacement_text: parsed.replacement_text || "No suggestion generated.",
                confidence_score: parsed.confidence_score || 0,
                notes: parsed.notes || "AI generated content.",
                skill_suggestions: parsed.skill_suggestions || []
            };

        } catch (e) {
            console.error("Failed to parse AI JSON response", e);
            return mockAIResponse(req);
        }

    } catch (error) {
        console.error("AI Generation failed:", error);
        return mockAIResponse(req);
    }
};

const mockAIResponse = (req: AIRequest): AIResponse => {
    return {
        notes: "Mock response (API Key missing)",
        replacement_text: `Improved content for ${req.targetRole} in ${req.currentSection}.`,
        confidence_score: 100,
        skill_suggestions: ["Mock Skill"]
    };
};
