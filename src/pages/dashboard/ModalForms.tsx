import { z } from 'zod';
import ModalComp from '../common/Modal/Modal';
import { LogoWrapper } from '../common/components/layoutStyles';
import { UserFormProvider, useUserForm } from '../common/form-context';
import { UseFormReturnType, zodResolver } from '@mantine/form';
import { LoaderWrapper, ModalInputs, Title } from './styles';
import GenericInput from '../common/components/input';
import GenericBtn from '../common/components/button';
import { THEME } from '../../appTheme';
import { SelectInput } from '../common/components/SelectInput';
import { useState } from 'react';
import { dialog } from '@tauri-apps/api';
import { Constants } from '../../utils/constants';
import { Group, Loader, Stepper } from '@mantine/core';
import MasterKeyPage from '../master-key';
import { schema } from './schema';
import { useMutation } from 'react-query';
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/api/notification';

let permissionGranted = await isPermissionGranted();
if (!permissionGranted) {
  const permission = await requestPermission();
  permissionGranted = permission === 'granted';
}

const Modalforms = ({ open, close }: { open: boolean; close: () => void }) => {
  const [all, setAll] = useState<{ [key: number]: string }>({});
  const [selectedFolder, setSelectedFolder] = useState<string | string[]>('');
  const [error, setError] = useState<string>('');
  const a = selectedFolder.toString().replace(/\\/g, '/');

  const [active, setActive] = useState(0);
  const [response, setResponse] = useState<any>([]);

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
    setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleFolderSelect = async () => {
    const result = await dialog.open({
      multiple: false,
      directory: true,
      title: 'Select folder with scanned images',
    });

    if (result) {
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
      await fetch(`${Constants.API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_dir: a,
          no_of_questions: data['number_of_questions'],
          master_key: { ...all },
        }),
      })
        .then((response) => {
          if (permissionGranted) {
            sendNotification({
              title: 'VisioMark',
              body: 'visioMark is awesome!',
            });
          }
          return response.json();
        })
        .then((data) => setResponse(data))
        .catch((err) => setError(err));
    },
    onSuccess: (data) => {
      console.log('success');
    },
    onError: (error) => {
      console.log('Error', error);
    },
  });

  return (
    <>
      <ModalComp opened={open} close={close}>
        <LogoWrapper>
          <img src="/src/assets/logo.svg" width={40} alt="logo" />
          <Title>visioMark</Title>
        </LogoWrapper>

        {mutate.isLoading ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : (
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
                      label="Total count of questions"
                      textInput
                      icon
                    />
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
                {active != 2 ? (
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
                ) : null}

                {active == 2 ? (
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
                ) : null}
              </Group>
            </form>
          </UserFormProvider>
        )}
      </ModalComp>
    </>
  );
};

export default Modalforms;
