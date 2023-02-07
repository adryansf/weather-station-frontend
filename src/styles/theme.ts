import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#183788',
      dark: '#0d185c',
      light: '#5faedf',
    },
    secondary: { dark: '#3f448d', main: '#5664ab', light: '#b996c5' },
    error: { main: red.A400 },
    common: {
      black: '#2e2e2e',
      white: '#f5f3fd',
    },
  },
});

export default theme;
