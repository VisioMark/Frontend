import GenericInput from '../common/components/input';
import General from './general';
import { AiOutlineMail } from 'react-icons/ai';
import { FormTitle, InputWrapper } from './styles';
import GenericBtn from '../common/components/button';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

type SignInForm = z.infer<typeof schema>;
const methods = useForm<SignInForm>({
  resolver: zodResolver(schema),
});

const onSubmit = (data: SignInForm) => {
  console.log(data);
};

const SignIn = () => {
  return (
    <General>
      <FormTitle>
        <p>Sign In</p>
      </FormTitle>

      <FormProvider {...methods}>
        <InputWrapper onSubmit={methods.handleSubmit(onSubmit)}>
          <GenericInput
            placeholder="someone@gmail.com "
            textInput
            label="Email"
            icon={<AiOutlineMail />}
          />
          <GenericInput placeholder="Password" label="Password" />
          <GenericBtn title="Sign In" />
        </InputWrapper>
      </FormProvider>
    </General>
  );
};

export default SignIn;
