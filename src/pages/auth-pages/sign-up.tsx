import GenericInput from '../common/components/input';
import General from './general';
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import { FormTitle, InputWrapper } from './styles';
import GenericBtn from '../common/components/button';
import { z } from 'zod';

const schema = z
  .object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignUpForm = z.infer<typeof schema>;

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
