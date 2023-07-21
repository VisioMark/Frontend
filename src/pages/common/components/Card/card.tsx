import { Card, Text, Tooltip } from '@mantine/core';
import { THEME } from '../../../../appTheme';
import { FileEntry } from '@tauri-apps/api/fs';
import { open } from '@tauri-apps/api/shell';

const SharedCard = ({
  name_of_file,
  entry,
}: {
  name_of_file: string | undefined;
  entry: FileEntry;
}) => {
  const openFile = async (path: string) => {
    console.log('🚀 ~ file: card.tsx:64 ~ openFile ~ path', path);

    await open(path);
  };
  return (
    <Tooltip label="Click to open file" withArrow position="top-end">
      <Card
        sx={{
          background: THEME.colors.background.jet,
          color: THEME.colors.text.primary,
          borderLeft: '1px solid red',
          cursor: 'pointer',
        }}
        onClick={() => openFile(entry.path)}
      >
        <Text size="lg" color="cyan">
          {name_of_file}
        </Text>
      </Card>
    </Tooltip>
  );
};

export default SharedCard;
