import { z } from 'zod';
import { THEME } from '../../appTheme';
import ModalComp from '../common/Modal/Modal';
import SharedCard from '../common/components/Card/card';
import Layout from '../common/components/Layout';
import GenericBtn from '../common/components/button';
import GenericInput from '../common/components/input';
import { LogoWrapper } from '../common/components/layoutStyles';
import {
  ModalInputs,
  RFContent,
  RecentFiles,
  RequestBtn,
  Title,
} from './styles';
import { useDisclosure } from '@mantine/hooks';
import { UserFormProvider, useUserForm } from '../common/form-context';
import { zodResolver } from '@mantine/form';
import { Select } from '@mantine/core';
import Modalforms from './ModalForms';

const Dashboard = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Layout>
      <RequestBtn>
        <Modalforms open={opened} close={close} />
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
