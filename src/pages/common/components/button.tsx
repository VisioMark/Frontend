import { Button, Sx, packSx } from '@mantine/core';
import { THEME } from '../../../appTheme';

const GenericBtn = ({
  title,
  sx,
  onClick,
  type,
}: {
  title: string;
  sx?: Sx | Sx[];
  onClick?: () => void;
  type: 'submit' | 'button';
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
      type={type}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default GenericBtn;
