import React from 'react';

import { Box } from '@mui/material';
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const columns: GridColDef[] = [
  {
    field: 'temperature',
    headerName: 'Temperatura (ºC)',
    width: 130,
  },
  {
    field: 'humidity',
    headerName: 'Umidade (%)',
    width: 100,
  },
  {
    field: 'pressure',
    headerName: 'Pressão (hPa)',
    width: 110,
  },
  {
    field: 'rain',
    headerName: 'Chuva (%)',
    width: 100,
  },
  {
    field: 'windVelocity',
    headerName: 'Velocidade do Vento (Km/h)',
    width: 200,
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
