import {
  ContentContainer,
  Dashboardcontainer,
  LogoWrapper,
  NavBarStyles,
  NavLinks,
  Navigation,
  SidebarContainer,
  Title,
  UserDetails,
} from './layoutStyles';
import { Constants } from '../../../utils/constants';
import { BiHome } from 'react-icons/bi';
import { CgFileDocument } from 'react-icons/cg';
import { FcStatistics } from 'react-icons/fc';
import { FiSettings } from 'react-icons/fi';
import { Avatar, Tabs } from '@mantine/core';
import { THEME } from '../../../appTheme';
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { StyledTabs } from './Tab';
import { VscPreview } from 'react-icons/vsc';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { tabValue } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Dashboardcontainer>
      <SidebarContainer>
        <LogoWrapper>
          <img src="/src/assets/logo.svg" width={40} alt="logo" />
          <Title>visioMark</Title>
        </LogoWrapper>
        <Navigation>
          <NavLinks to={`${Constants.PATHS.home}`} aria-label="link to home">
            <BiHome size={20} />
            Home
          </NavLinks>

          <NavLinks
            to={`${Constants.PATHS.allfiles}`}
            aria-label="shows all the files"
          >
            <CgFileDocument size={20} />
            All files
          </NavLinks>

          {pathname === `${Constants.PATHS.preview}` ||
          pathname === Constants.PATHS.statistics ? (
            <>
              <NavLinks
                to={`${Constants.PATHS.preview}`}
                aria-label="settings of the user"
              >
                <VscPreview size={20} />
                Preview
              </NavLinks>
              <NavLinks
                to={`${Constants.PATHS.statistics}`}
                aria-label="settings of the user"
              >
                <FcStatistics size={20} />
                Statistics
              </NavLinks>
            </>
          ) : null}
          <NavLinks
            to={`${Constants.PATHS.settings}`}
            aria-label="settings of the user"
          >
            <FiSettings size={20} />
            Settings
          </NavLinks>
        </Navigation>
      </SidebarContainer>

      <ContentContainer>
        <NavBarStyles>
          <div>
            {pathname === Constants.PATHS.preview ||
            pathname === Constants.PATHS.statistics ? (
              <StyledTabs
                defaultValue={'preview'}
                value={tabValue}
                onTabChange={(value) => navigate(`/${value}`)}
              >
                <Tabs.List>
                  <Tabs.Tab value="preview">Preview</Tabs.Tab>
                  <Tabs.Tab value="statistics">Statistics</Tabs.Tab>
                </Tabs.List>
              </StyledTabs>
            ) : null}
          </div>
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
        </NavBarStyles>
        {children}
      </ContentContainer>
    </Dashboardcontainer>
  );
};

export default Layout;
