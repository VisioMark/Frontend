import { z } from 'zod';
import { THEME } from '../../appTheme';
import SharedCard from '../common/components/Card/card';
import Layout from '../common/components/Layout';
import GenericBtn from '../common/components/button';
import { RFContent, RecentFiles, RequestBtn } from './styles';
import { useDisclosure } from '@mantine/hooks';
import Modalforms from './ModalForms';
import {
  readDir,
  BaseDirectory,
  FileEntry,
  readTextFile,
} from '@tauri-apps/api/fs';
import { ScrollArea, Text } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { documentDir, join } from '@tauri-apps/api/path';
import { ITableDataProps } from '../common/Table/types';
import { appContext } from '../../utils/Context';
import { useNavigate } from 'react-router-dom';
import useDashboard from './hook/useDashboard';

const documentDirPath = await documentDir();
const a = await join(documentDirPath, 'visioMark');

const entries = await readDir('visioMark', {
  dir: BaseDirectory.Document,
  recursive: true,
});
console.log('🚀 ~ file: dashboard.tsx:29 ~ entries:', entries);

const Dashboard = () => {
  const { getFilenamesFromLocalStorage } = useDashboard();
  const [opened, { open, close }] = useDisclosure(false);
  const [allFiles, setAllFiles] = useState<FileEntry[]>([]);
  const { forPreview, responseData } = useContext(appContext);
  const navigate = useNavigate();

  const recentFiles = getFilenamesFromLocalStorage();

  function findMatches() {
    const matches = recentFiles.map((itemName) => {
      // Find all items in 'a' that have a matching 'name' property
      return entries.filter((item) => item.name === itemName);
    });

    return matches.flat();
  }

  const recentEntries = findMatches();
  console.log('🚀 ~ file: dashboard.tsx:51 ~ Dashboard ~ a:', a);

  // useEffect(() => {
  //   if (forPreview) {
  //     navigate('/preview', { state: responseData });
  //   }
  // }, [forPreview, responseData, navigate]);

  (function processEntries(entries: FileEntry[]) {
    for (const entry of entries) {
      if (entry.children) {
        setAllFiles((prev) => [...prev, entry]);
        processEntries(entry.children);
      }
    }
  })(entries);

  const revesedEntries = entries.reverse();
  const firstFive = revesedEntries.slice(0, 5);

  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          height: 'calc(100% - 64px)',
        }}
      >
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
          <ScrollArea
            style={{
              height: '39vh',
              padding: '10px 15px 10px 0',
            }}
          >
            <RFContent>
              {recentEntries.map((entry, index) => (
                <SharedCard
                  key={index}
                  name_of_file={entry.name}
                  entry={entry}
                />
              ))}
            </RFContent>
          </ScrollArea>
        </RecentFiles>
      </div>
    </Layout>
  );
};

export default Dashboard;
