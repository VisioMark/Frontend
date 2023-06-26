import { LogoWrapper } from '../common/components/layoutStyles';
import { Title } from '../auth-pages/styles';
import { DottedContainer } from './styles';
import GenericBtn from '../common/components/button';
import Layout from '../common/components/Layout';

const Upload = () => {
  return (
    <>
      <Layout>
        <br />
        <DottedContainer>
          <div>
            <img
              src="/src/assets/icons8-upload-64.png"
              width={160}
              style={{ paddingLeft: 250 }}
            />
          </div>
          <>
            <p style={{ paddingLeft: 200 }}>Drag and drop your files</p>
            <p style={{ paddingLeft: 290 }}>OR</p>
          </>
          <div style={{ marginLeft: 250, marginBottom: 10 }}>
            <GenericBtn title="Browse File" />
          </div>
        </DottedContainer>
        <br />
        <p>Upload files</p>
      </Layout>
    </>
  );
};

export default Upload;
