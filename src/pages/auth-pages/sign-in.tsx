import GenericInput from '../common/components/input';
import General from './general';
import { AiOutlineMail } from 'react-icons/ai';
import { FormTitle, InputWrapper } from './styles';
import { PasswordInput } from '@mantine/core';
import { THEME } from '../../appTheme';
import GenericBtn from '../common/components/button';

const SignIn = () => {
  return (
    <General>
      <FormTitle>
        <p>Sign In</p>
      </FormTitle>

      <InputWrapper>
        <GenericInput
          placeholder="someone@gmail.com "
          label="Email"
          icon={<AiOutlineMail />}
        />
        <PasswordInput
          placeholder="Password"
          label="Password"
          sx={{
            label: {
              color: THEME.colors.text.primary,
            },
          }}
        />
        <GenericBtn title="Sign In" />
      </InputWrapper>
    </General>
  );
};

export default SignIn;
