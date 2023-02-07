import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { useRef, useState } from 'react';

interface Props {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  create: (name: string) => Promise<void>;
}
const CreateMachineDialog: React.FC<Props> = ({ open, setIsOpen, create }) => {
  const [alertIsOpen, setIsAlertOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCreate = async () => {
    const value = inputRef.current?.value || '';

    if (value.length < 3) {
      return setIsAlertOpen(true);
    }

    create(value);
  };

  return (
    <>
      <Dialog open={open} onClose={() => setIsOpen(false)}>
        <DialogTitle>Criar Equipamento</DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="justify">
            Informe um nome de no mínimo 3 caracteres para o novo equipamento.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            type="text"
            fullWidth
            variant="standard"
            inputRef={inputRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
          <Button onClick={handleCreate}>Criar</Button>
        </DialogActions>
        <Collapse in={alertIsOpen}>
          <Alert severity="warning">
            O nome do equipamento deve ter pelo menos 3 caracteres.
          </Alert>
        </Collapse>
      </Dialog>
    </>
  );
};

export default CreateMachineDialog;
