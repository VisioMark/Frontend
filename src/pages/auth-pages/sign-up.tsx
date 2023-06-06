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
          textInput
          placeholder="Username "
          icon={<AiOutlineUser />}
          label={'Username'}
        />
        <GenericInput
          textInput
          placeholder="someone@gmail.com "
          label="Email"
          icon={<AiOutlineMail />}
        />
        <GenericInput
          placeholder="Password"
          label="Password"
          description="Password must include at least one letter, number and special character"
        />
        <GenericInput
          placeholder="confirm your password"
          label="Confirm Password"
          description="Password must include at least one letter, number and special character"
        />
        <GenericBtn title="Create an account" />
      </InputWrapper>
    </General>
  );
};

export default SignUp;
