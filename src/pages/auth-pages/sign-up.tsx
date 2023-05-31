import GenericInput from '../common/components/input';
import General from './general';
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import { FormTitle, InputWrapper } from './styles';

const SignUp = () => {
  return (
    <General>
      <FormTitle>
        <p>Sign Up</p>
        <p>Fill in the details and we can get you started.</p>
      </FormTitle>

      <InputWrapper>
        <GenericInput placeholder="Username " icon={<AiOutlineUser />} />
        <GenericInput
          placeholder="someone@gmail.com "
          icon={<AiOutlineMail />}
        />
      </InputWrapper>
    </General>
  );
};

export default SignUp;
