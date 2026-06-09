import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const dirPath = path.join(process.cwd(), "public", "portfolio");

    // Ensure the directory exists
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const files = fs.readdirSync(dirPath);

    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];
    const images = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return allowedExtensions.includes(ext);
      })
      .map((file) => `/portfolio/${file}`);

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Error reading portfolio directory:", error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}
