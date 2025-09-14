const azureOpenAi = require("openai");
const dotenv = require("dotenv");
const systemPrompt = require("./prompt");

dotenv.config();

async function callAzureApi(command) {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
  const apiKey = process.env["AZURE_OPENAI_API_KEY"];
  const apiVersion = "2025-01-01-preview";
  const deployment = "gpt-4.1-mini"; // This must match your deployment name

  const client = new azureOpenAi.AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });

  const itinerarySchema = {
  name: "TravelItinerary",
  schema: {
    type: "object",
    properties: {
      tripName: { type: "string" },
      dateRange: { type: "string" },
      days: {
        type: "array",
        items: {
          type: "object",
          properties: {
            day_number: { type: "integer", minimum: 1 },
            city: { type: "string" },
            date: { type: "string" },
            timeline: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  // Accepts either a range "09:00-11:30" or a single time "21:00"
                  time: {
                    type: "string",
                    pattern: "^(\\d{1,2}:\\d{2})(\\s?-\\s?\\d{1,2}:\\d{2})?$"
                  },
                  activities: {
                    type: "array",
                    items: { type: "string" },
                    minItems: 1
                  }
                },
                required: ["time", "activities"]
              },
              minItems: 1
            },
            notes: { type: "array", items: { type: "string" } }
          },
          required: ["day_number", "date", "timeline", "notes"]
        }
      }
    },
    required: ["tripName", "dateRange", "days"],
    additionalProperties: false
  }
};
  const result = await client.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: command }
    ],
    response_format: {
    type: "json_schema",
    json_schema: itinerarySchema
  },
    max_tokens: 13107,
      temperature: 0.2,
      top_p: 0.95,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: null
  });

  const content = result.choices[0].message.content;
  return JSON.parse(content, null, 2);
}

module.exports = callAzureApi