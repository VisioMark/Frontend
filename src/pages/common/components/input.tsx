import { GenericTextInput } from '../../auth-pages/styles';
import { THEME } from '../../../appTheme';
import { PasswordInput } from '@mantine/core';
import { createFormContext } from '@mantine/form';

type GenericInputProps = {
  placeholder: string;
  icon?: React.ReactNode;
  label: string;
  textInput?: boolean;
  description?: string;
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

const [useFormContext] = createFormContext();

const GenericInput = ({
  placeholder,
  icon,
  label,
  textInput,
  description,
}: GenericInputProps) => {
  const {} = useFormContext();
  return (
    <div>
      {textInput ? (
        <GenericTextInput
          placeholder={placeholder}
          icon={icon}
          label={label}
          withAsterisk
          sx={sx}
        />
      ) : (
        <PasswordInput
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
