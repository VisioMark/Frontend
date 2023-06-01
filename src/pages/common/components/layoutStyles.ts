import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Dashboardcontainer = styled.div`
  display: flex;
`;

export const SidebarContainer = styled.div`
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 30%;
`;

export const LogoWrapper = styled.div`
  display: flex;
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
`;

export const ContentContainer = styled.div`
  background-color: red;
  width: 100%;
  border-radius: 10px 0 0 0;
  height: 100vh;
`;
