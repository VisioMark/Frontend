import { GenericTextInput } from '../../auth-pages/styles';
import { THEME } from '../../../appTheme';
import { PasswordInput, TextInput } from '@mantine/core';
import { useUserFormContext } from '../form-context';

type GenericInputProps = {
  placeholder: string;
  icon?: React.ReactNode;
  label: string;
  textInput?: boolean;
  description?: string;
  val_name: string;
};

const sx = {
  label: {
    color: THEME.colors.text.primary,
  },
  input: {
    background: THEME.colors.background.jet,
    color: THEME.colors.text.primary,
  },
};

const GenericInput = ({
  placeholder,
  icon,
  label,
  textInput,
  val_name,
  description,
}: GenericInputProps) => {
  const form = useUserFormContext();
  return (
    <div>
      {textInput ? (
        <TextInput
          {...form.getInputProps(val_name)}
          placeholder={placeholder}
          icon={icon}
          label={label}
          withAsterisk
          sx={sx}
        />
      ) : (
        <PasswordInput
          {...form.getInputProps(val_name)}
          placeholder={placeholder}
          label={label}
          sx={sx}
          description={description}
          withAsterisk
        />
      )}
    </div>
  );
};

export default GenericInput;
