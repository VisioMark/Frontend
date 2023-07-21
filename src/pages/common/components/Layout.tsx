import {
  ContentContainer,
  Dashboardcontainer,
  LogoWrapper,
  NavLinks,
  Navigation,
  SidebarContainer,
  Title,
  UserDetails,
} from './layoutStyles';
import { Constants } from '../../../utils/constants';
import { BiHome } from 'react-icons/bi';
import { CgFileDocument } from 'react-icons/cg';
import { FiSettings } from 'react-icons/fi';
import { Avatar } from '@mantine/core';
import { THEME } from '../../../appTheme';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dashboardcontainer>
      <SidebarContainer>
        <LogoWrapper>
          <img src="/src/assets/logo.svg" width={40} alt="logo" />
          <Title>visioMark</Title>
        </LogoWrapper>
        <Navigation>
          <NavLinks to={'/'} aria-label="link to home">
            <BiHome size={20} />
            Home
          </NavLinks>

          <NavLinks to={'/allfiles'} aria-label="shows all the files">
            <CgFileDocument size={20} />
            All files
          </NavLinks>

          <NavLinks to={'/settings'} aria-label="settings of the user">
            <FiSettings size={20} />
            Settings
          </NavLinks>
        </Navigation>
      </SidebarContainer>

      <ContentContainer>
        <UserDetails>
          <Avatar
            styles={{
              placeholder: {
                color: `${THEME.colors.button.midnight_green}`,
              },
            }}
          >
            JD
          </Avatar>
          {/* <img src="/src/assets/user.svg" width={40} alt="user" /> */}
          <p>John Doe</p>
        </UserDetails>
        {children}
      </ContentContainer>
    </Dashboardcontainer>
  );
};

export default Layout;
