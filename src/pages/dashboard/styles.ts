import styled from 'styled-components';
import { THEME } from '../../appTheme';

export const RequestBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${THEME.colors.background.jet};
  height: 40%;
  margin-top: 0.4rem;
  border-radius: 10px;
`;

export const RecentFiles = styled.div`
  margin-top: 2rem;
`;

export const Title = styled.p`
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 2px;
`;

export const RFContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ModalInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
