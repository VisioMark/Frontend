import { LogoWrapper } from '../common/components/layoutStyles';
import { Title } from './styles';
import { CenteredContainer } from './styles';
import GenericBtn from '../common/components/button';
import Layout from '../common/components/Layout';
import { Link } from 'react-router-dom';

const SignOut = () => {
  return (
    <>
      <Layout>
        <br />
        <CenteredContainer>
          <div>
            <img
              src="/src/assets/icons8-logout-96.png"
              width={160}
              style={{ paddingLeft: 250 }}
            />
          </div>
          <>
            <p style={{ paddingLeft: 175 }}>
              Are you sure you mant to log out?
            </p>
          </>
          <br />
          <br />
          <div style={{ marginLeft: 250, marginBottom: 10 }}>
            <Link to="/signin">
              <GenericBtn title="Yes" />
            </Link>{' '}
            <GenericBtn title="No" />
          </div>
        </CenteredContainer>
      </Layout>
    </>
  );
};

export default SignOut;
