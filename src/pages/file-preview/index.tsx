import Layout from '../common/components/Layout';
import GenericTable from '../common/Table/table';
import { useLocation } from 'react-router-dom';

const Preview = () => {
  const data = useLocation().state;
  console.log('🚀 ~ file: index.tsx:8 ~ Preview ~ data:', data);
  return (
    <Layout>
      <GenericTable data={data} />
    </Layout>
  );
};

export default Preview;
