import { z } from 'zod';
import { THEME } from '../../appTheme';
import ModalComp from '../common/Modal/Modal';
import SharedCard from '../common/components/Card/card';
import Layout from '../common/components/Layout';
import GenericBtn from '../common/components/button';
import GenericInput from '../common/components/input';
import { LogoWrapper } from '../common/components/layoutStyles';
import { RFContent, RecentFiles, RequestBtn } from './styles';
import { useDisclosure } from '@mantine/hooks';
import Modalforms from './ModalForms';
import { readDir, BaseDirectory, FileEntry } from '@tauri-apps/api/fs';
import { Text } from '@mantine/core';

const entries = await readDir('visioMark', {
  dir: BaseDirectory.Document,
  recursive: true,
});

function processEntries(entries: FileEntry[]) {
  for (const entry of entries) {
    console.log(`Entry: ${entry.path}`);
    if (entry.children) {
      processEntries(entry.children);
    }
  }
}

const revesedEntries = entries.reverse();
const firstFive = revesedEntries.slice(0, 5);

const Dashboard = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Layout>
      <RequestBtn>
        <Modalforms open={opened} close={close} />
        <GenericBtn
          type="button"
          title="Make a Request"
          sx={{
            height: '7rem',
            width: '19rem',
            fontSize: '1.3rem',
            background: `${THEME.colors.button.primary}`,
          }}
          onClick={open}
        />
      </RequestBtn>

      <RecentFiles>
        <Text
          variant="gradient"
          gradient={{ from: '#ffff', to: 'cyan', deg: 45 }}
          sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
          ta="left"
          fz="2rem"
          fw={700}
        >
          RECENT FILES
        </Text>
        <div style={{ overflowY: 'auto', background: '', height: '' }}>
          <RFContent>
            {firstFive.map((entry, index) => (
              <SharedCard key={index} name_of_file={entry.name} entry={entry} />
            ))}
          </RFContent>
        </div>
      </RecentFiles>
    </Layout>
  );
};

export default Dashboard;
