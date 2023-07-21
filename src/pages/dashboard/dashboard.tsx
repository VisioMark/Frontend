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
import { useState } from 'react';
import { set } from '@techstark/opencv-js';

const entries = await readDir('visioMark', {
  dir: BaseDirectory.Document,
  recursive: true,
});

const revesedEntries = entries.reverse();
const firstFive = revesedEntries.slice(0, 5);

const Dashboard = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [allFiles, setAllFiles] = useState<FileEntry[]>([]);
  console.log('🚀 ~ file: dashboard.tsx:29 ~ Dashboard ~ allFiles:', allFiles);

  function processEntries(entries: FileEntry[]) {
    for (const entry of entries) {
      // console.log(`Entry: ${entry.path}`);
      if (entry.children) {
        setAllFiles((prev) => [...prev, entry]);
        processEntries(entry.children);
      }
    }
  }
  return (
    <Layout>
      <RequestBtn>
        <Modalforms open={opened} close={close} />
        <GenericBtn
          tooltip="Start the process of marking your files"
          type="button"
          title="Mark sheets"
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
          gradient={{
            from: '#ffff',
            to: `${THEME.colors.button.midnight_green}`,
            deg: 45,
          }}
          sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
          ta="left"
          fz="2rem"
          fw={700}
        >
          RECENT FILES
        </Text>
        <RFContent>
          {firstFive.map((entry, index) => (
            <SharedCard key={index} name_of_file={entry.name} entry={entry} />
          ))}
        </RFContent>
      </RecentFiles>
    </Layout>
  );
};

export default Dashboard;
