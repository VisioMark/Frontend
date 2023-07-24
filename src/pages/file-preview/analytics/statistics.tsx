import useStatistics from '../hooks/useStatistics';
import Layout from '../../common/components/Layout';

const Statistics = () => {
  const { averageScore, cronbachAlpha, totalVariance } = useStatistics();
  console.log(
    '🚀 ~ file: statistics.tsx:6 ~ Statistics ~ cronbachAlpha:',
    cronbachAlpha
  );
  return (
    <Layout>
      <h1>Statistics</h1>
    </Layout>
  );
};

export default Statistics;
