import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import * as React from 'react';

interface Props {
  IconArea: React.ReactElement;
  value: string | number | React.ReactElement;
}

const CardComponent: React.FC<Props> = ({ IconArea, value }) => {
  return (
    <Card
      sx={{
        display: 'flex',
      }}
    >
      <CardMedia
        sx={{
          display: 'flex',
          flexGrow: 1,
          marginRight: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {IconArea}
      </CardMedia>
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CardContent>{value}</CardContent>
      </Box>
    </Card>
  );
};

export default CardComponent;
