
async function testLocalAPI() {
    console.log("🚀 Testing http://localhost:3000/api/ai/suggest ...");

    try {
        const response = await fetch("http://localhost:3000/api/ai/suggest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userText: "Managed team of 5 developers",
                targetRole: "Engineering Manager",
                currentSection: "Experience",
                task: "improve"
            })
        });

        if (!response.ok) {
            console.error(`❌ Server Error: ${response.status} ${response.statusText}`);
            console.error(await response.text());
            return;
        }

        const data = await response.json();
        console.log("✅ Success! AI Response Received:");
        console.log(JSON.stringify(data, null, 2));

        if (data.improved_text) {
            console.log("\n✨ Verification Passed: The app is correctly talking to OpenRouter!");
        } else {
            console.warn("\n⚠️ Warning: Response format looks unexpected (missing improved_text).");
        }

    } catch (error) {
        console.error("❌ Connection Failed:", error);
    }
}

testLocalAPI();
