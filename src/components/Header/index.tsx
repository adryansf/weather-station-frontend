import { AddCircleOutline } from '@mui/icons-material';
import {
  Alert,
  AppBar,
  Box,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Snackbar,
  Toolbar,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import React, { useCallback, useContext, useState } from 'react';

// Hooks
import { useFecth } from '../../hooks/useFetch';

// Services
import api from '../../services/api';

// Interfaces
import { Machine } from '../../types/api';

// Context
import { Context as CurrentMachineContext } from '../../context/CurrentMachineContext';
import { Context as LoadingContext } from '../../context/LoadingContext';

// Components
import CreateMachineDialog from '../CreateMachineDialog';
import NewMachineDialog from '../NewMachineDialog';

// Assets
import Logo from '../../assets/logo.svg';

const Header: React.FC = () => {
  const [createDialogIsOpen, setIsCreateDialogOpen] = useState(false);
  const [newMachineDialogIsOpen, setIsNewMachineDialogOpen] = useState(false);
  const [idCreated, setIdCreated] = useState('');
  const [alertIsOpen, setIsAlertOpen] = useState(false);

  const theme = useTheme();
  const { currentMachine, setCurrentMachine } = useContext(
    CurrentMachineContext
  );
  const { setLoading } = useContext(LoadingContext);

  const { data, mutate } = useFecth<Machine[]>('machines');

  const handleChangeMachine = (e: SelectChangeEvent) => {
    if (setCurrentMachine && data) {
      const selectedMachine = data.find(m => m.id === e.target.value);
      if (selectedMachine) setCurrentMachine(selectedMachine);
    }
  };

  const createMachine = useCallback(
    async (name: string) => {
      setIsCreateDialogOpen(false);
      setLoading(true);
      try {
        const { data } = await api.post('/machines', {
          name,
        });
        mutate();
        setIdCreated(data.machine.id);
        setLoading(false);
        setIsNewMachineDialogOpen(true);
      } catch (err) {
        setLoading(false);
        setIsAlertOpen(true);
      }
    },
    [data, mutate]
  );

  return (
    <AppBar
      position="static"
      style={{ background: theme.palette.primary.light }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
            <img
              src={Logo}
              alt="Weather Station"
              style={{ width: '150px', height: '100px', objectFit: 'cover' }}
            />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', sm: 'none' },
            }}
          >
            <img
              src={Logo}
              alt="Weather Station"
              style={{ width: '80px', height: '100px', objectFit: 'contain' }}
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <FormControl sx={{ width: { xs: 165, sm: 400 } }}>
              <InputLabel id="current-machine-select-label">
                Equipamento
              </InputLabel>
              <Select
                labelId="current-machine-select-label"
                id="current-machine-simple-select"
                value={currentMachine?.id || ''}
                label="Current Machine"
                onChange={handleChangeMachine}
                inputProps={{
                  style: {
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'pre',
                  },
                }}
              >
                {data?.map(machine => (
                  <MenuItem
                    key={`${machine.createdAt}-${machine.name}`}
                    value={machine.id}
                  >
                    {machine.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ marginLeft: 0.5 }}>
            <IconButton
              size="large"
              color="primary"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <AddCircleOutline fontSize="medium" />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <CreateMachineDialog
        setIsOpen={setIsCreateDialogOpen}
        open={createDialogIsOpen}
        create={createMachine}
      />
      <NewMachineDialog
        setIsOpen={setIsNewMachineDialogOpen}
        open={newMachineDialogIsOpen}
        id={idCreated}
      />
      <Snackbar
        open={alertIsOpen}
        autoHideDuration={6000}
        onClose={() => setIsAlertOpen(false)}
      >
        <Alert
          sx={{ width: '100%' }}
          onClose={() => setIsAlertOpen(false)}
          severity="error"
        >
          Error ao criar um equipamento!
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

export default Header;
