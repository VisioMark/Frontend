import { z } from 'zod';
import ModalComp from '../common/Modal/Modal';
import { LogoWrapper } from '../common/components/layoutStyles';
import { UserFormProvider, useUserForm } from '../common/form-context';
import { zodResolver } from '@mantine/form';
import { ModalInputs, Title } from './styles';
import GenericInput from '../common/components/input';
import GenericBtn from '../common/components/button';
import { THEME } from '../../appTheme';
import { SelectInput } from '../common/components/SelectInput';
import { useState } from 'react';
import { dialog } from '@tauri-apps/api';
import { Constants } from '../../utils/constants';
import { Group, Stepper } from '@mantine/core';
import MasterKeyPage from '../master-key';

const schema = z.object({
  course_code: z.string().min(5).toUpperCase(),
  department_code: z
    .string({
      required_error: 'Error',
      invalid_type_error: 'Should be a number',
    })
    .min(3, { message: 'Department code must be 3 digits' })
    .max(3),
  year: z.string().min(3).max(3),
  number_of_questions: z.string().max(200),
  academic_year: z.string().min(3),
  lecturer_name: z.string().min(3),
});

const Modalforms = ({ open, close }: { open: boolean; close: () => void }) => {
  const form = useUserForm({
    validate: zodResolver(schema),
    initialValues: {
      course_code: '',
      department_code: '',
      year: '',
      number_of_questions: '',
      academic_year: '',
      lecturer_name: '',
    },
  });

  const [all, setAll] = useState({});

  const [clicked, setClicked] = useState(false);
  console.log('🚀 ~ file: index.tsx:15 ~ clicked:', clicked);

  function DisplayDivMultipleTimes() {
    const divs = [];

    for (let i = 1; i <= parseInt(form.values['number_of_questions']); i++) {
      divs.push(
        <MasterKeyPage
          key={i}
          all={all}
          setAll={setAll}
          clicked={clicked}
          setClicked={setClicked}
          index={i}
          question_number={i}
        />
      );
    }

    return <>{divs}</>;
  }

  const [selectedFolder, setSelectedFolder] = useState<string | string[]>('');

  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleFolderSelect = async () => {
    const result = await dialog.open({
      multiple: false,
      directory: true,
      title: 'Select folder with scanned images',
    });

    if (result) {
      console.log(result);
      setSelectedFolder(result);
    }
  };
  return (
    <>
      <ModalComp opened={open} close={close}>
        <LogoWrapper>
          <img src="/src/assets/logo.svg" width={40} alt="logo" />
          <Title>visioMark</Title>
        </LogoWrapper>

        <UserFormProvider form={form}>
          <form onSubmit={form.onSubmit((value) => console.log(value))}>
            <Stepper active={active} onStepClick={setActive}>
              <Stepper.Step label="Step 1">
                <ModalInputs>
                  <GenericInput
                    {...form.getInputProps('lecturer_name')}
                    placeholder=""
                    val_name="lecturer_name"
                    label="Name of Lecturer"
                    textInput
                    icon
                  />

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
                    type="number"
                    icon
                  />
                </ModalInputs>
              </Stepper.Step>
              <Stepper.Step label="step 2">
                <ModalInputs>
                  <SelectInput
                    label="Year"
                    val_name="year"
                    placeholder="Select year"
                    data={Constants.ACADEMIC_LEVELS}
                  />
                  <SelectInput
                    label="Academic year"
                    val_name="academic_year"
                    placeholder="Select academic year"
                    data={Constants.ACADEMIC_YEAR}
                  />
                  <GenericInput
                    placeholder=""
                    val_name="number_of_questions"
                    label="Number of questions"
                    textInput
                    icon
                  />{' '}
                  <GenericBtn
                    title="Select Folder"
                    onClick={handleFolderSelect}
                    type="button"
                    sx={{
                      height: '2rem',
                      width: '100%',
                      fontSize: '1rem',
                      background: `${THEME.colors.button.primary}`,
                    }}
                  />
                </ModalInputs>
              </Stepper.Step>
              <Stepper.Completed>
                <DisplayDivMultipleTimes />
              </Stepper.Completed>
            </Stepper>

            {selectedFolder && (
              <div>
                <p>{selectedFolder}</p>
              </div>
            )}

            <br />

            <Group position="center" mt="xl">
              <GenericBtn
                title="Back"
                type="button"
                onClick={prevStep}
                sx={{
                  height: '2rem',
                  width: '5rem',
                  fontSize: '1rem',
                  background: `${THEME.colors.button.primary}`,
                }}
              />
              <GenericBtn
                title="Next"
                type="button"
                onClick={nextStep}
                sx={{
                  height: '2rem',
                  width: '5rem',
                  fontSize: '1rem',
                  background: `${THEME.colors.button.primary}`,
                }}
              />
            </Group>
          </form>
        </UserFormProvider>
      </ModalComp>
    </>
  );
};

export default Modalforms;
