import { THEME } from '../../appTheme';
import ModalComp from '../common/Modal/Modal';
import SharedCard from '../common/components/Card/card';
import Layout from '../common/components/Layout';
import GenericBtn from '../common/components/button';
import GenericInput from '../common/components/input';
import { LogoWrapper } from '../common/components/layoutStyles';
import { RFContent, RecentFiles, RequestBtn, Title } from './styles';
import { useDisclosure } from '@mantine/hooks';

const Dashboard = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Layout>
      <RequestBtn>
        <ModalComp opened={opened} close={close}>
          {
            <LogoWrapper>
              <img src="/src/assets/logo.svg" width={40} alt="logo" />
              <Title>visioMark</Title>
            </LogoWrapper>
          }

          {<GenericInput placeholder="" label="Lecturer name" icon />}

          {<GenericInput placeholder="" label="Course code" icon />}

          {<GenericInput placeholder="" label="Department code" icon />}

          {<GenericInput placeholder="" label="Year" icon />}

          {<GenericInput placeholder="" label="Number of questions" icon />}
          <br />
          {
            <GenericBtn
              title="Done"
              sx={{
                height: '2rem',
                width: '5rem',
                fontSize: '1rem',
                background: `${THEME.colors.button.primary}`,
              }}
            />
          }
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
