import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

interface Props {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}
const NewMachineDialog: React.FC<Props> = ({ open, setIsOpen, id }) => {
  return (
    <Dialog open={open} onClose={() => setIsOpen(false)}>
      <DialogTitle>Equipamento cadastrado com sucesso!</DialogTitle>
      <DialogContent>
        <DialogContentText textAlign="center">
          Configure o seu equipamento com o código:{' '}
          <strong>
            <code>{id}</code>
          </strong>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Entendi</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewMachineDialog;
