import { THEME } from '../../appTheme';
import ModalComp from '../Modal/Modal';
import SharedCard from '../common/components/Card/card';
import Layout from '../common/components/Layout';
import GenericBtn from '../common/components/button';
import { RFContent, RecentFiles, RequestBtn, Title } from './styles';
import { useDisclosure } from '@mantine/hooks';

const Dashboard = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Layout>
      <RequestBtn>
        <ModalComp opened={opened} close={close} />
        <GenericBtn
          title="Make a Request"
          sx={{
            height: '7rem',
            width: '19rem',
            fontSize: '1.3rem',
            background: `${THEME.colors.button.primary}`,
          }}
          onClick={open}
        />
      </RequestBtn>

      <RecentFiles>
        <Title>RECENT FILES</Title>
        <RFContent>
          <SharedCard />
        </RFContent>
      </RecentFiles>
    </Layout>
  );
};

export default Dashboard;
