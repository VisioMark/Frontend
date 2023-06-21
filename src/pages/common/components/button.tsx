import { Button, Sx, packSx } from '@mantine/core';
import { THEME } from '../../../appTheme';

const GenericBtn = ({
  title,
  sx,
  onClick,
}: {
  title: string;
  sx?: Sx | Sx[];
  onClick?: () => void;
}) => {
  return (
    <Button
      sx={[
        {
          background: `${THEME.colors.button.primary}`,
          fontFamily: 'Poppins',
          fontWeight: 'bold',
        },
        ...packSx(sx),
      ]}
      type="submit"
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default GenericBtn;
