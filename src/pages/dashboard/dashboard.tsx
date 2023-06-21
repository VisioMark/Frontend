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

const schema = z.object({
  course_code: z.string().min(6).max(6),
  department_code: z.string().min(3).max(3),
  year: z.string().datetime(),
  number_of_questions: z.number().max(200),
});

const Dashboard = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useUserForm({
    validate: zodResolver(schema),
    initialValues: {
      course_code: '',
      department_code: '',
      year: '',
      number_of_questions: '',
    },
  });

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

          {
            <UserFormProvider form={form}>
              <form onSubmit={form.onSubmit((value) => console.log(value))}>
                <ModalInputs>
                  <GenericInput
                    {...form.getInputProps('course_code')}
                    placeholder=""
                    val_name="course_code"
                    label="Course code"
                    textInput
                    icon
                  />

                  <GenericInput
                    val_name="department_code"
                    placeholder=""
                    label="Department code"
                    textInput
                    icon
                  />

                  <GenericInput
                    val_name="year"
                    placeholder=""
                    label="Year"
                    textInput
                    icon
                  />

                  <GenericInput
                    placeholder=""
                    val_name="number_of_questions"
                    label="Number of questions"
                    textInput
                    icon
                  />
                </ModalInputs>

                <br />

                <GenericBtn
                  title="Done"
                  sx={{
                    height: '2rem',
                    width: '5rem',
                    fontSize: '1rem',
                    background: `${THEME.colors.button.primary}`,
                  }}
                />
              </form>
            </UserFormProvider>
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
