// NameInput.tsx
import { TextInput } from '@mantine/core';
import { useUserFormContext } from '../form-context';

export function NameInput() {
  const form = useUserFormContext();
  return <TextInput label="Name" {...form.getInputProps('name')} />;
}
