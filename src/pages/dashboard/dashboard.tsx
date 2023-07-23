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
import { useState } from 'react';
import { documentDir, join } from '@tauri-apps/api/path';
import { ITableDataProps } from '../common/Table/types';

const documentDirPath = await documentDir();
const a = await join(documentDirPath, 'visioMark');

export const readCSVFile = async ({
  name_of_file,
}: {
  name_of_file?: string;
}) => {
  try {
    const result = await readTextFile(`visioMark\\${name_of_file}`, {
      dir: BaseDirectory.Document,
    });
    const csvData = result.split('\n');
    const data: ITableDataProps[] = [];
    for (const row of csvData) {
      const rowData = row.split(',');
      const item = {
        file_name: rowData[0],
        predictions: rowData[1],
        score: rowData[2],
        'index number': rowData[3],
      };
      data.push(item);
    }
    const newData = data.splice(-1, 1);
    return data.splice(1);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const entries = await readDir('visioMark', {
  dir: BaseDirectory.Document,
  recursive: true,
});

const Dashboard = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [allFiles, setAllFiles] = useState<FileEntry[]>([]);

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
              {firstFive.map((entry, index) => (
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
