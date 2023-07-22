import Layout from '../common/components/Layout';
import GenericTable from '../common/Table/table';
import { useLocation } from 'react-router-dom';

const Preview = () => {
  const data = useLocation().state;
  return (
    <Layout>
      <GenericTable data={data} />
    </Layout>
  );
};

export default Preview;
