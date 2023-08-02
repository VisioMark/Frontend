import { THEME } from '../../appTheme';
import SharedCard from '../common/components/Card/card';
import Layout from '../common/components/Layout';
import GenericBtn from '../common/components/button';
import { RFContent, RecentFiles, RequestBtn } from './styles';
import { useDisclosure } from '@mantine/hooks';
import Modalforms from './ModalForms';
import { readDir, BaseDirectory } from '@tauri-apps/api/fs';
import { ScrollArea, Text } from '@mantine/core';

import useDashboard from './hook/useDashboard';

const entries = await readDir('visioMark', {
  dir: BaseDirectory.Document,
  recursive: true,
});

const Dashboard = () => {
  const { getFilenamesFromLocalStorage } = useDashboard();
  const [opened, { open, close }] = useDisclosure(false);

  const recentFiles = getFilenamesFromLocalStorage();

  function findMatches() {
    const matches = recentFiles.map((itemName) => {
      const matchedItems = entries.filter((item) => item.name === itemName);
      // if (matchedItems.length === 0) {
      //   const filteredData = recentFiles.filter((item) => item !== itemName);
      //   localStorage.setItem('recentFileNames', JSON.stringify(filteredData));
      // }
      return matchedItems;
    });

    return matches.flat();
  }

  const recentEntries = findMatches();

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
