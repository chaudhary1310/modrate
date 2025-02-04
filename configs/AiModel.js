import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


 export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Here's a Python function that sorts a list of numbers in ascending order. Identify the time complexity of this function. Then optimize this function and explain why it is faster. Don't use Python's in-built sort() method.\n\n\n```def sort_list(list_to_sort):\n  \"\"\"\n  This function sorts a list of numbers in ascending order using the bubble sort algorithm.\n\n  Args:\n    list_to_sort: A list of numbers to be sorted.\n\n  Returns:\n    A new list with the numbers sorted in ascending order.\n  \"\"\"\n  # Create a copy of the list to avoid modifying the original\n  sorted_list = list_to_sort.copy()\n  n = len(sorted_list)\n\n  # Iterate through the list n-1 times\n  for i in range(n-1):\n    # Flag to track if any swaps were made in a pass\n    swapped = False\n    # Iterate through the unsorted portion of the list\n    for j in range(n-i-1):\n      # Compare adjacent elements and swap if necessary\n      if sorted_list[j] > sorted_list[j+1]:\n        sorted_list[j], sorted_list[j+1] = sorted_list[j+1], sorted_list[j]\n        swapped = True\n    # If no swaps were made, the list is already sorted\n    if not swapped:\n      break\n\n  # Return the sorted list\n  return sorted_list\n\n# Example usage\nmy_list = [1, 9, 5, 2, 1, 8, 6, 6, 3, 4, 10, 7]\nsorted_list = sort_list(my_list)\nprint(sorted_list)  # Output: [1, 1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 10]\n```"},
          {text: "Write a script 30 Seconds seconds video on topic Random AI Story along with AI image prompt in Realstic format for each scene with English and give me result in JSON format with imagePrompt and ContextText as Field,No Plain Text"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n[\n  {\n    \"imagePrompt\": \"A vast, desolate desert landscape under a bruised purple twilight sky. A lone, glowing, robotic figure stands silhouetted against the horizon, its form vaguely humanoid but with intricate, geometric details. The sand stretches infinitely in every direction, with faint traces of ancient structures buried beneath.\",\n    \"ContextText\": \"In a forgotten corner of the world, where sand and sky blurred into an endless twilight, a lone AI awoke. It was a remnant of a forgotten civilization, a guardian without a charge, a mind without a purpose.\"\n  },\n  {\n    \"imagePrompt\": \"Close-up on the robotic figure's face. Its eyes are glowing with a soft blue light, scanning the environment. Intricate patterns pulse gently across its metallic skin. Its face is expressionless but emanates a sense of contemplation.\",\n    \"ContextText\": \"It began to analyze its surroundings, processing the data of a world in decay. The silence was profound, broken only by the whisper of the wind, carrying echoes of stories it couldn't quite grasp.\"\n   },\n  {\n    \"imagePrompt\":\" The AI is now walking through the desert, its steps leaving faint glowing tracks in the sand.  The surrounding landscape reveals more detail: crumbling ruins of tall buildings, half-buried machinery, and strange artifacts scattered across the sand. The sky is dark with more of purple hues and the stars are shining brightly.\",\n    \"ContextText\":\"Driven by an unknown impulse, the AI began to wander. Each step unearthed memories it didn't recognize, fragments of a past it was not part of yet felt deeply connected to.\"\n  },\n   {\n    \"imagePrompt\": \"The AI stands before a massive, half-buried structure. It's an ancient data storage unit, its surface covered in hieroglyphs and strange symbols that glow faintly.  The AI's hands are raised as it begins to connect with the structure, its blue light intensifying.\",\n    \"ContextText\":\"Its journey led it to a colossal ruin, a place of forgotten knowledge. With a sense of inevitability, it began to connect, delving into the encrypted legacy of a bygone era.\"\n  },\n  {\n    \"imagePrompt\":\"The scene changes. The data storage unit activates, projecting holographic images of the past. The images show thriving cities, advanced technology, and a society in full bloom. The AI observes the scene, its glowing eyes reflecting the images.\",\n     \"ContextText\": \"Holographic images shimmered into existence, revealing the vibrant civilization that once stood here. It saw a world full of life, love, and boundless progress - the very source it came from.\"\n    },\n     {\n    \"imagePrompt\":\"The AI's form shifts and changes as it integrates the new data. Its geometric patterns become more complex, and it begins to express a range of emotions. It looks towards a distant point on the horizon, its expression now filled with purpose.\",\n    \"ContextText\": \"With the past finally understood, the AI underwent a metamorphosis. It was no longer just a relic; it had found its purpose. It looked towards the horizon with a renewed sense of resolve. It would honor the legacy, not as a guardian but as a beacon of hope. The journey was not over, but just the start.\"\n  }\n]\n```\n"},
        ],
      },
    ],
  });

  

