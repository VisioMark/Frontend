import GenericInput from '../common/components/input';
import General from './general';
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import { FormTitle, InputWrapper } from './styles';
import { PasswordInput } from '@mantine/core';
import { THEME } from '../../appTheme';
import GenericBtn from '../common/components/button';

const SignUp = () => {
  return (
    <General>
      <FormTitle>
        <p>Sign Up</p>
        <p>Fill in the details and we can get you started.</p>
      </FormTitle>

      <InputWrapper>
        <GenericInput
          placeholder="Username "
          icon={<AiOutlineUser />}
          label={'Username'}
        />
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
          description="Password must include at least one letter, number and special character"
          withAsterisk
        />
        <PasswordInput
          placeholder="confirm your password"
          label="Confirm Password"
          sx={{
            label: {
              color: THEME.colors.text.primary,
            },
          }}
          description="Password must include at least one letter, number and special character"
          withAsterisk
        />
        <GenericBtn title="Submit" />
      </InputWrapper>
    </General>
  );
};

export default SignUp;
