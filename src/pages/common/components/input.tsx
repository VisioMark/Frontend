import { GenericTextInput } from '../../auth-pages/styles';
import { THEME } from '../../../appTheme';

type GenericInputProps = {
  placeholder: string;
  icon: React.ReactNode;
  label: string;
};

const GenericInput = ({ placeholder, icon, label }: GenericInputProps) => {
  return (
    <div>
      <GenericTextInput
        placeholder={placeholder}
        icon={icon}
        label={label}
        withAsterisk
        sx={{
          label: {
            color: THEME.colors.text.primary,
          },
        }}
      />
    </div>
  );
};

export default GenericInput;
