import fs from 'fs';
import { useContext, useState } from 'react';
import { appContext } from './Context';
import { BaseDirectory, readTextFile } from '@tauri-apps/api/fs';
import { ITableDataProps } from '../pages/common/Table/types';

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
      resolve(true);
    };

    img.onload = () => {
      resolve(false);
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

export const readCSVFile = async ({
  name_of_file,
}: {
  name_of_file?: string;
}) => {
  try {
    const result = await readTextFile(`visioMark\\${name_of_file}`, {
      dir: BaseDirectory.Document,
    });
    const csvData = result.split('\n');
    const data: ITableDataProps[] = [];
    for (const row of csvData) {
      const rowData = row.split(',');
      const item = {
        file_name: rowData[0],
        predictions: rowData[1],
        score: Number(rowData[2]),
        'index number': rowData[3],
      };
      data.push(item);
    }
    const newData = data.splice(-1, 1);
    return data.splice(1);
  } catch (error) {
    console.log(error);
    return;
  }
};

export function convertToCountedObjects(
  numbers: number[]
): { value: number; count: number }[] {
  const countedObjects = numbers.reduce<{ [key: number]: number }>(
    (countMap, num) => {
      countMap[num] = (countMap[num] || 0) + 1;
      return countMap;
    },
    {}
  );

  return Object.entries(countedObjects).map(([value, count]) => ({
    value: Number(value),
    count,
  }));
}

function generateRandomHex(length: number): string {
  let result = '';
  const characters = '0123456789ABCDEF';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function countOccurenceofDifficultyLevel(
  difficultyLevels: string[]
): { label: string; count: number; color: string; part: number }[] {
  const countedObjects = difficultyLevels.reduce<{ [key: string]: number }>(
    (countMap, level) => {
      countMap[level] = (countMap[level] || 0) + 1;
      return countMap;
    },
    {}
  );

  return Object.entries(countedObjects).map(([value, count]) => ({
    label: value,
    count,
    part: (count / difficultyLevels.length) * 100,
    color: `#${generateRandomHex(6)}`,
  }));
}

export function calculateDifficultyLevels(
  scores: number[],
  totalPossibleScore: number
): string[] {
  const numStudents = scores.length;
  const totalScore = scores.reduce((sum, score) => sum + score, 0);
  const percentageCorrect =
    (totalScore / (numStudents * totalPossibleScore)) * 100;

  let difficultyLevel = '';
  if (percentageCorrect >= 80) {
    difficultyLevel = 'Easy';
  } else if (percentageCorrect >= 50) {
    difficultyLevel = 'Moderate';
  } else {
    difficultyLevel = 'Difficult';
  }

  return Array(scores.length).fill(difficultyLevel);
}
