import styled from '@emotion/styled';
import { TextInput } from '@mantine/core';

export const MainContainer = styled.div`
  display: flex;
  padding: 2rem 40px;
  justify-content: space-between;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 3rem;
`;

export const LogoContainer = styled.div``;

export const Title = styled.h1`
  font-family: Rubik;
`;

export const RightContainer = styled.div`
  padding: 7rem 0;
  width: 50%;
`;

export const FormTitle = styled.div``;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const GenicTextInput = styled(TextInput)`
  & .mantine-inputWrapper {
    background-color: 'white';
  }

  & .mantine-inputWrapper-label {
    color: 'white';
  }
`;
