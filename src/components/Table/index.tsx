import React from 'react';

import { Box } from '@mui/material';
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const columns: GridColDef[] = [
  {
    field: 'temperature',
    headerName: 'Temperatura',
    width: 100,
  },
  {
    field: 'humidity',
    headerName: 'Umidade',
    width: 100,
  },
  {
    field: 'pressure',
    headerName: 'Pressão',
    width: 100,
  },
  {
    field: 'rain',
    headerName: 'Chuva',
    width: 100,
  },
  {
    field: 'solarRadiation',
    headerName: 'Radiação Solar',
    width: 150,
  },
  {
    field: 'windVelocity',
    headerName: 'Velocidade do Vento',
    width: 150,
  },
  {
    field: 'windDirection',
    headerName: 'Direção do Vento',
    width: 150,
  },
  {
    field: 'createdAt',
    headerName: 'Data do Registro',
    width: 150,
    flex: 1,
    valueGetter: params =>
      format(new Date(params.value), 'PPPPpppp', { locale: ptBR }),
  },
];

const Table: React.FC<Omit<DataGridProps, 'columns'>> = props => {
  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid {...props} columns={columns} disableSelectionOnClick />
    </Box>
  );
};

export default Table;
