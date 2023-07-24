import { useContext } from 'react';
import { appContext } from '../../../utils/Context';

const useStatistics = () => {
  const { responseData } = useContext(appContext);

  const getScores = () => {
    const scores: number[] = [];
    responseData.map((data) => scores.push(data.score));
    return scores;
  };
  const scores = getScores();

  const numberOfQuestions = 20;

  // Calculate the average score
  const averageScore =
    scores.reduce((sum, score) => sum + score, 0) / scores.length;

  // Calculate the variance
  const variance =
    scores.reduce((sum, score) => sum + Math.pow(score - averageScore, 2), 0) /
    scores.length;

  // Calculate the item variance (variance of each question)
  const itemVariance = variance / numberOfQuestions;

  // Calculate the total variance
  const totalVariance =
    scores.reduce((sum, score) => sum + Math.pow(score - averageScore, 2), 0) /
    (scores.length - 1);

  // Calculate Cronbach's alpha
  const cronbachAlpha =
    (numberOfQuestions * itemVariance) /
    (itemVariance + (numberOfQuestions - 1) * totalVariance);
  console.log("Cronbach's Alpha:", cronbachAlpha);

  return {
    averageScore,
    cronbachAlpha,
    totalVariance,
  };
};

export default useStatistics;
