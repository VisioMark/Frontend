import { THEME } from '../../appTheme';
import ModalComp from '../common/Modal/Modal';
import Layout from '../common/components/Layout';
import GenericBtn from '../common/components/button';
import { RequestBtn } from './styles';
import { useDisclosure } from '@mantine/hooks';

const Dashboard = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Layout>
      <RequestBtn>
        <ModalComp opened={opened} close={close}>
          {<>hello</>}
        </ModalComp>
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
      Recent Files
    </Layout>
  );
};

export default Dashboard;
