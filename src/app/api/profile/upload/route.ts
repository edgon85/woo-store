import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

cloudinary.config(process.env.CLOUDINARY_URL || '');

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ message: 'Error al subir la imagen' });
    }

    // Convertir la imagen a un buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determinar el tipo MIME de la imagen
    const mimeType = getImageMimeType(buffer);
    if (!mimeType) {
      return NextResponse.json({ message: 'Tipo de imagen desconocido' });
    }

    // Procesar la imagen con sharp (redimensionar, cambiar formato, etc.)
    const processedBuffer = await sharp(buffer)
      .resize(500, 500) // Redimensionar la imagen (ajustar según necesidad)
      .toFormat(
        mimeType.includes('jpeg') ? 'jpeg' : 'png',
        mimeType.includes('jpeg') ? { quality: 80 } : { compressionLevel: 9 } // Ajuste según el tipo MIME
      )
      .toBuffer();

    // Convertir la imagen procesada a base64
    const base64String = processedBuffer.toString('base64');
    const dataUri = `data:${mimeType};base64,${base64String}`;

    // Subir la imagen a Cloudinary
    const { secure_url } = await cloudinary.uploader.upload(dataUri, {
      folder: 'woo-users',
    });

    return NextResponse.json({ message: secure_url });
  } catch (error) {
    console.error('Error en la subida de la imagen:', error);
    return NextResponse.json({ message: 'Error en la subida de la imagen' });
  }
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
