import fs from 'fs';
import { useState } from 'react';

export const checkImagesForCorruption = async (
  imageDir: string
): Promise<string[]> => {
  const imageNames = await fetchImageNames(imageDir);
  const corruptedImagesList: string[] = [];

  for (const imageName of imageNames) {
    const isCorrupted = await checkImageCorruption(imageName, imageDir);
    if (isCorrupted) {
      corruptedImagesList.push(imageName);
    }
  }

  return corruptedImagesList;
};

const fetchImageNames = (directory: string): Promise<string[]> => {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) {
        reject(err); // Error occurred while reading the directory
      } else {
        const imageNames = files.filter((file) => {
          const extension = file.split('.').pop()?.toLowerCase();
          return (
            extension === 'jpg' || extension === 'jpeg' || extension === 'png'
          ); // Add more supported extensions if needed
        });
        resolve(imageNames);
      }
    });
  });
};

const checkImageCorruption = async (
  imageName: string,
  imageDir: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = `${imageDir}/${imageName}`;

    img.onerror = () => {
      resolve(true); // Image is corrupted or failed to load
    };

    img.onload = () => {
      resolve(false); // Image loaded successfully (not corrupted)
    };
  });
};

const ImageChecker = ({ imageDir }: { imageDir: string }) => {
  const [corruptedImages, setCorruptedImages] = useState<string[]>([]);

  const handleCheckImages = async () => {
    const corruptedImagesList = await checkImagesForCorruption(imageDir);
    setCorruptedImages(corruptedImagesList);
  };
};
