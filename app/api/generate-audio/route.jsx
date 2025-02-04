import axios from "axios";
import { NextResponse } from "next/server";
import FormData from "form-data";

export async function POST(req) {
  if (!process.env.MURF_API_KEY || !process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error("Missing required environment variables.");
  }

  try {
    const { text } = await req.json();

    // Step 1: Generate AI Speech
    let data = {
      voiceId: "en-US-natalie",
      style: "Promo",
      text,
      rate: 0,
      pitch: 0,
      sampleRate: 48000,
      format: "MP3",
      channelType: "MONO",
      encodeAsBase64: false,
      variation: 1,
      modelVersion: "GEN2",
      multiNativeLocale: "en-US"
    };

    const response = await axios.post("https://api.murf.ai/v1/speech/generate", data, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "api-key": process.env.MURF_API_KEY
      }
    });

    // Step 2: Download the Audio File
    const audioFileUrl = response.data.audioFile;
    if (!audioFileUrl) throw new Error("Audio generation failed, no file received.");

    const audioResponse = await axios.get(audioFileUrl, { responseType: "arraybuffer" });
    const audioBuffer = Buffer.from(audioResponse.data);
    const fileName = `audio_${Date.now()}.mp3`;

    // Step 3: Upload to Cloudinary
    const formData = new FormData();
    formData.append("file", audioBuffer, { filename: fileName });
    formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET); // Cloudinary preset

    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`, 
      formData, 
      {
        headers: { ...formData.getHeaders() }
      }
    );
    console.log("Cloudinary Response:", cloudinaryResponse.data.secure_url);
    // Return Cloudinary URL
    return NextResponse.json({'result': cloudinaryResponse.data.secure_url });
     
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
