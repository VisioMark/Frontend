import { Modal, createStyles } from '@mantine/core';
import { THEME } from '../../../appTheme';

const useStyles = createStyles((theme) => ({
  modal: {
    '& .mantine-Modal-header': {
      background: `${THEME.colors.background.secondary}`,
    },

    '& .mantine-Paper-root': {
      background: `${THEME.colors.background.secondary}`,
      color: `${THEME.colors.text.primary}`,
      height: '80vh',
    },
  },
}));

const ModalComp = ({
  opened,
  close,
  children,
}: {
  opened: boolean;
  close: () => void;
  children: React.ReactNode;
}) => {
  const { classes } = useStyles();
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        className={classes.modal}
        size={'800px'}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalComp;
