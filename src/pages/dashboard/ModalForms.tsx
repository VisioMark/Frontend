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
    },
  });

  const [selectedFolder, setSelectedFolder] = useState<string | string[]>('');

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
                  type="number"
                  icon
                />
                <SelectInput
                  label="Year"
                  val_name="year"
                  placeholder="Select year"
                  data={[
                    {
                      value: '100',
                      label: '100',
                    },
                    {
                      value: '200',
                      label: '200',
                    },
                    {
                      value: '300',
                      label: '300',
                    },
                    {
                      value: '400',
                      label: '400',
                    },
                    {
                      value: '500',
                      label: '500',
                    },
                    {
                      value: '600',
                      label: '600',
                    },
                    {
                      value: '700',
                      label: '700',
                    },
                  ]}
                />
                <SelectInput
                  label="Academic year"
                  val_name="academic_year"
                  placeholder="Select academic year"
                  data={[
                    {
                      value: '2020/2021',
                      label: '2020/2021',
                    },
                    {
                      value: '2021/2022',
                      label: '2021/2022',
                    },
                    {
                      value: '2022/2023',
                      label: '2022/2023',
                    },
                    {
                      value: '2023/2024',
                      label: '2023/2024',
                    },
                  ]}
                />
                <GenericInput
                  placeholder=""
                  val_name="number_of_questions"
                  label="Number of questions"
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

              <br />

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
            </form>
          </UserFormProvider>
        }
      </ModalComp>
    </>
  );
};

export default Modalforms;
