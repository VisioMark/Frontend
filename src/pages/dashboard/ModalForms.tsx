import { z } from 'zod';
import ModalComp from '../common/Modal/Modal';
import { LogoWrapper } from '../common/components/layoutStyles';
import { UserFormProvider, useUserForm } from '../common/form-context';
import { UseFormReturnType, zodResolver } from '@mantine/form';
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
import { schema } from './schema';
import { useMutation } from 'react-query';

const Modalforms = ({ open, close }: { open: boolean; close: () => void }) => {
  const [all, setAll] = useState<{ [key: number]: string }>({});
  console.log('🚀 ~ file: ModalForms.tsx:20 ~ Modalforms ~ all:', all);
  const [selectedFolder, setSelectedFolder] = useState<string | string[]>('');
  const [active, setActive] = useState(1);

  function DisplayDivMultipleTimes() {
    const divs = [];

    // @ts-ignore
    for (let i = 1; i <= parseInt(form.values['number_of_questions']); i++) {
      divs.push(
        <MasterKeyPage
          key={i}
          all={all}
          setAll={setAll}
          index={i}
          question_number={i}
        />
      );
    }

    return <>{divs}</>;
  }

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

  const form: UseFormReturnType<unknown, (values: unknown) => typeof schema> =
    useUserForm({
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

  const mutate = useMutation({
    mutationFn: async (data: { [key: string]: string }) => {
      console.log('🚀 ~ file: ModalForms.tsx:77 ~ mutationFn: ~ data:', {
        image_dir: selectedFolder,
        no_of_questios: data['number_of_questions'],
        master_key: { ...all },
      });
      await fetch('http://localhost:3000/api/scan', {
        method: 'POST',
        body: JSON.stringify({ ...data, ...all }),
      });
    },
  });

  return (
    <>
      <ModalComp opened={open} close={close}>
        <LogoWrapper>
          <img src="/src/assets/logo.svg" width={40} alt="logo" />
          <Title>visioMark</Title>
        </LogoWrapper>

        <UserFormProvider form={form}>
          {/* @ts-ignore */}
          <form onSubmit={form.onSubmit((value) => mutate.mutate(value))}>
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
                  {selectedFolder && (
                    <div>
                      <p>{selectedFolder}</p>
                    </div>
                  )}
                </ModalInputs>
              </Stepper.Step>
              <Stepper.Completed>
                <DisplayDivMultipleTimes />
              </Stepper.Completed>
            </Stepper>

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

              <GenericBtn
                title="Done"
                type="submit"
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
