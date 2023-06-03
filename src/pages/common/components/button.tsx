import { Button, Sx, packSx } from '@mantine/core';
import { THEME } from '../../../appTheme';

const GenericBtn = ({
  title,
  styles,
  sx,
}: {
  title: string;
  styles?: React.CSSProperties;
  sx?: Sx | Sx[];
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
    >
      {title}
    </Button>
  );
};

export default GenericBtn;
