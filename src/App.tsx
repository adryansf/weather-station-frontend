import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

// Context
import CurrentMachineContextProvider from './context/CurrentMachineContext';
import LoadingContextProvider from './context/LoadingContext';

// theme
import theme from './styles/theme';

// Components
import Header from './components/Header';

// Pages
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <LoadingContextProvider>
      <CurrentMachineContextProvider>
        <ThemeProvider theme={theme}>
          <Header />
          <Dashboard />
          <CssBaseline />
        </ThemeProvider>
      </CurrentMachineContextProvider>
    </LoadingContextProvider>
  );
}

export default App;
