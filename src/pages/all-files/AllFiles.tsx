import { BaseDirectory, readDir } from '@tauri-apps/api/fs';
import Layout from '../common/components/Layout';
import { Text } from '@mantine/core';
import { AllFilesContainer } from './styles';
import SharedCard from '../common/components/Card/card';

const entries = await readDir('visioMark', {
  dir: BaseDirectory.Document,
  recursive: true,
});

const AllFiles = () => {
  return (
    <Layout>
      <Text
        variant="gradient"
        gradient={{ from: '#ffff', to: 'cyan', deg: 45 }}
        sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
        ta="left"
        fz="2rem"
        fw={700}
      >
        ALL FILES
      </Text>
      <AllFilesContainer>
        {entries.map((entry, index) => (
          <SharedCard key={index} name_of_file={entry.name} entry={entry} />
        ))}
      </AllFilesContainer>
    </Layout>
  );
};

export default AllFiles;
