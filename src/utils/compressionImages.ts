import imageCompression from 'browser-image-compression';

export const compressImages = async (files: File[]): Promise<File[]> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const compressPromises = files.map((file) => imageCompression(file, options));

  return Promise.all(compressPromises);
};
