import { useContext, useState } from 'react';
import { appContext } from './Context';
import { BaseDirectory, readTextFile } from '@tauri-apps/api/fs';
import { ITableDataProps } from '../pages/common/Table/types';

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
) {
  const easyScore = (80 / 100) * totalPossibleScore;
  const moderateScore = (50 / 100) * totalPossibleScore;

  let easyCount = 0;
  let moderateCount = 0;
  let difficultCount = 0;

  scores.map((score) => {
    if (score >= easyScore) {
      easyCount++;
    } else if (score >= moderateScore) {
      moderateCount++;
    } else {
      difficultCount++;
    }
  });

  const totalCount = easyCount + moderateCount + difficultCount;
  const easyPart = Math.round((easyCount / totalCount) * 100);
  const moderatePart = Math.round((moderateCount / totalCount) * 100);
  const difficultPart = Math.round((difficultCount / totalCount) * 100);

  const data = [
    {
      label: 'Easy',
      count: easyCount,
      part: easyPart,
      color: `#${generateRandomHex(6)}`,
    },
    {
      label: 'Moderate',
      count: moderateCount,
      part: moderatePart,
      color: `#${generateRandomHex(6)}`,
    },
    {
      label: 'Difficult',
      count: difficultCount,
      part: difficultPart,
      color: `#${generateRandomHex(6)}`,
    },
  ];

  return data;
}
