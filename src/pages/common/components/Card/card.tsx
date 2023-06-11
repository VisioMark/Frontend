import { Card } from '@mantine/core';
import { THEME } from '../../../../appTheme';
const SharedCard = () => {
  return (
    <Card
      sx={{
        background: THEME.colors.background.jet,
        color: THEME.colors.text.primary,
        borderLeft: '1px solid red',
      }}
    >
      asdf
    </Card>
  );
};

export default SharedCard;
