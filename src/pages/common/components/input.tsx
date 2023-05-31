import { TextInput } from '@mantine/core';
import { FiBold } from 'react-icons/fi';
import { GenicTextInput } from '../../auth-pages/styles';

type GenericInputProps = {
  placeholder: string;
  icon: React.ReactNode;
};

const GenericInput = ({ placeholder, icon }: GenericInputProps) => {
  return (
    <div>
      <GenicTextInput placeholder={placeholder} icon={icon} size="lg" />
    </div>
  );
};

export default GenericInput;
