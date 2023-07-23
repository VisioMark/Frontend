import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { THEME } from '../../../appTheme';

export const sx = {
  label: {
    color: THEME.colors.text.primary,
  },
  input: {
    background: THEME.colors.background.jet,
    color: THEME.colors.text.primary,
  },
};

export const Dashboardcontainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const SidebarContainer = styled.div`
  padding: 0 0.1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 25rem;
`;

export const LogoWrapper = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
`;

export const Title = styled.p`
  font-family: Rubik;
`;

export const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const NavLinks = styled(NavLink)`
  color: white;
  display: flex;
  gap: 1rem;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
  padding: 0.5rem 1rem;

  &.active {
    background-color: ${THEME.colors.background.jet};
    border-radius: 10px;

    border-left: 3px solid ${THEME.colors.button.primary};
  }
`;

export const ContentContainer = styled.div`
  background: linear-gradient(
    45deg,
    ${THEME.colors.background.jet},
    ${THEME.colors.background.primary}
  );
  width: 100%;
  border-radius: 20px 0 0 0;
  height: auto;
  padding: 1.5rem;
`;

export const NavBarStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background-color: ${THEME.colors.background.jet};
`;

export const UserDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background-color: ${THEME.colors.background.jet};
`;
