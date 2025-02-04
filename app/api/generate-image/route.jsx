import axios from "axios";
import { NextResponse } from "next/server";
import FormData from "form-data"; // Ensure it's installed

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    // Step 1: Get Image from Unsplash
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?page=1&query=${prompt}&client_id=${process.env.NEXT_PUBLIC_API_ACCESS_KEY}`
    );

    // Validate response structure
    if (!response.data.results.length) {
      throw new Error("No image found for the given topic.");
    }

    const imageUrl = response.data.results[0].urls.full;
    console.log("Unsplash Image URL:", imageUrl);

    // Step 2: Fetch Image Data
    const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(imageResponse.data);
    const fileName = `image_${Date.now()}.jpg`;

    // Step 3: Upload to Cloudinary
    const formData = new FormData();
    formData.append("file", imageBuffer,fileName); // Convert buffer to base64
    formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET); // Cloudinary preset

    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: { ...formData.getHeaders() },
      }
    );
  console.log(cloudinaryResponse);
    // Return Cloudinary Image URL
    return NextResponse.json({  'result': cloudinaryResponse.data.secure_url });

  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
