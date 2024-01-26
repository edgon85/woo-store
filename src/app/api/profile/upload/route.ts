import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config(process.env.CLOUDINARY_URL || '');

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ message: 'Error al subir la imagen' });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const mimeType = getImageMimeType(buffer);
  if (!mimeType) {
    throw new Error('Unknown image type');
  }

  const base64String = buffer.toString('base64');
  const dataUri = `data:${mimeType};base64,${base64String}`;
  // console.log(readableStream);
  const { secure_url } = await cloudinary.uploader.upload(dataUri, {
    folder: 'woo-users',
    transformation: [
      { gravity: 'face', height: 500, width: 500, crop: 'fill' },
      { fetch_format: 'jpg' },
      // { radius: 'max' },
    ],
    /* eager: [
      { width: 400, height: 400, crop: 'crop', gravity: 'face' },
      { width: 400, height: 400, crop: 'pad' },
    ], */
  });
  console.log(secure_url);
  // return Response.json({ message: secure_url });
  return NextResponse.json({ message: secure_url });
}

function getImageMimeType(buffer: Buffer): string | null {
  const jpegSignature = [0xff, 0xd8, 0xff];
  const pngSignature = [0x89, 0x50, 0x4e, 0x47];

  const bufferStart = Array.from(buffer.slice(0, 4));

  if (jpegSignature.every((val, index) => val === bufferStart[index])) {
    return 'image/jpeg';
  } else if (pngSignature.every((val, index) => val === bufferStart[index])) {
    return 'image/png';
  }

  return null;
}
