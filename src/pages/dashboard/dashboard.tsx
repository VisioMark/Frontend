import { THEME } from '../../appTheme';
import Layout from '../common/components/Layout';
import GenericBtn from '../common/components/button';
import { RequestBtn } from './styles';

const Dashboard = () => {
  return (
    <Layout>
      <RequestBtn>
        <GenericBtn
          title="Make a Request"
          sx={{
            height: '7rem',
            width: '19rem',
            fontSize: '1.3rem',
            background: `${THEME.colors.button.primary}`,
          }}
        />
      </RequestBtn>
      Recent Files
    </Layout>
  );
};

export default Dashboard;
