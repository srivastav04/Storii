// /app/api/uploadToImageKit/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get("file") as Blob;
  const fileName = data.get("fileName") as string;

  const imageKitForm = new FormData();
  imageKitForm.append("file", file);
  imageKitForm.append("fileName", fileName);
  console.log("Using private key:", process.env.IMAGEKIT_PRIVATE_KEY);

  try {
    const res = await axios.post(
      "https://upload.imagekit.io/api/v1/files/upload",
      imageKitForm,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.IMAGEKIT_PRIVATE_KEY}:`
          ).toString("base64")}`,
        },
      }
    );
    const uploadedUrl = res.data.url;
    console.log("uploadedUrl", uploadedUrl);

    if (uploadedUrl.endsWith(".mp4")) {
      try {
        await axios.get(uploadedUrl + "?tr=w-100,h-100");
      } catch (err: any) {
        const imageKitError = err.response?.data;
        console.log("imageKitError", imageKitError);

        if (
          imageKitError.includes("transformations") ||
          imageKitError?.message?.includes("not allowed")
        ) {
          return NextResponse.json(
            {
              error:
                "Video transformation limit exceeded on ImageKit Free Plan.",
              details: imageKitError,
            },
            { status: 403 }
          );
        }
      }
    }
    return NextResponse.json({ url: uploadedUrl }, { status: 200 });
  } catch (error: any) {
    console.error(error.response?.data);
    return NextResponse.json(
      { error: "Upload failed", details: error.response?.data },
      { status: 500 }
    );
  }
}
