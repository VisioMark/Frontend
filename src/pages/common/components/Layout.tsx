import { NavLink } from 'react-router-dom';
import {
  ContentContainer,
  Dashboardcontainer,
  LogoWrapper,
  NavLinks,
  Navigation,
  SidebarContainer,
  Title,
} from './layoutStyles';
import { Constants } from '../../../utils/constants';
import { BiHome } from 'react-icons/bi';
import { CgFileDocument } from 'react-icons/cg';
import { FiSettings } from 'react-icons/fi';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dashboardcontainer>
      <SidebarContainer>
        <LogoWrapper>
          <img src="/src/assets/logo.svg" width={40} alt="logo" />
          <Title>visioMark</Title>
        </LogoWrapper>
        <Navigation>
          <NavLinks to={Constants.PATHS.signUp} aria-label="link to home">
            <BiHome size={20} />
            Home
          </NavLinks>

          <NavLinks to={Constants.PATHS.signUp} aria-label="link to home">
            <CgFileDocument size={20} />
            All files
          </NavLinks>

          <NavLinks to={Constants.PATHS.signUp} aria-label="link to home">
            <FiSettings size={20} />
            Settings
          </NavLinks>
        </Navigation>
      </SidebarContainer>

      <ContentContainer>{children}</ContentContainer>
    </Dashboardcontainer>
  );
};

export default Layout;
