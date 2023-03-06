import {
  Air as AirIcon,
  Cloud as CloudIcon,
  Opacity as OpacityIcon,
  Thermostat as ThermostatIcon,
  TireRepair as PressureIcon,
} from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Grid,
  Pagination,
  Typography,
  useTheme,
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useContext, useState } from 'react';

// API

// Context
import { Context as CurrentMachineContext } from '../../context/CurrentMachineContext';

// Hooks
import { useFecth } from '../../hooks/useFetch';

// Components
import Card from '../../components/Card';
import Loading from '../../components/Loading';
import Table from '../../components/Table';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const { currentMachine } = useContext(CurrentMachineContext);

  const [page, setPage] = useState(1);

  let { data: lastData } = useFecth(
    currentMachine?.id ? `/reports/${currentMachine?.id}?page=${1}` : null,
    {
      refreshInterval: 10000,
      errorRetryInterval: 10000,
    }
  );

  lastData = lastData?.reports[0];

  const { data: data, isLoading } = useFecth(
    currentMachine?.id ? `/reports/${currentMachine?.id}?page=${page}` : null,
    {
      refreshInterval: 10000,
      errorRetryInterval: 10000,
    }
  );

  if (!currentMachine) return <></>;

  return (
    <>
      {lastData && (
        <>
          <Grid
            sx={{ background: theme.palette.common.white }}
            container
            spacing={2}
            padding={1}
            paddingX={2}
            justifyContent="center"
          >
            <Grid item xs={12}>
              <Breadcrumbs>
                {' '}
                <Typography color="text.primary">
                  Última Atualização:{' '}
                  {formatDistanceToNow(new Date(lastData.createdAt), {
                    locale: ptBR,
                    addSuffix: true,
                    includeSeconds: true,
                  })}
                </Typography>
              </Breadcrumbs>
            </Grid>

            {/* Item */}
            <Grid item xs>
              <Card
                IconArea={
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <ThermostatIcon color="secondary" sx={{ fontSize: 100 }} />
                    <Typography variant="overline" textAlign="center">
                      Temperatura
                    </Typography>
                  </Box>
                }
                value={
                  <Box display="flex">
                    <Typography color="secondary" variant="h3">
                      {lastData.temperature}
                    </Typography>
                    <Typography color="secondary" variant="h6">
                      {' '}
                      °C
                    </Typography>
                  </Box>
                }
              />
            </Grid>

            {/* Item */}
            <Grid item xs>
              <Card
                IconArea={
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <OpacityIcon
                      sx={{ fontSize: 100, color: theme.palette.primary.light }}
                    />
                    <Typography variant="overline" textAlign="center">
                      Umidade
                    </Typography>
                  </Box>
                }
                value={
                  <Box display="flex">
                    <Typography color="primary.light" variant="h3">
                      {lastData.humidity}
                    </Typography>
                    <Typography color="primary.light" variant="h6">
                      {' '}
                      %
                    </Typography>
                  </Box>
                }
              />
            </Grid>

            {/* Item */}
            <Grid item xs>
              <Card
                IconArea={
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <PressureIcon color="warning" sx={{ fontSize: 100 }} />{' '}
                    <Typography variant="overline" textAlign="center">
                      Pressão
                    </Typography>
                  </Box>
                }
                value={
                  <Box display="flex">
                    <Typography color={theme.palette.warning.main} variant="h3">
                      {lastData.pressure}
                    </Typography>
                    <Typography color={theme.palette.warning.main} variant="h6">
                      {' '}
                      hPa
                    </Typography>
                  </Box>
                }
              />
            </Grid>

            {/* Item */}
            <Grid item xs>
              <Card
                IconArea={
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CloudIcon color="primary" sx={{ fontSize: 100 }} />
                    <Typography variant="overline" textAlign="center">
                      Chuva
                    </Typography>
                  </Box>
                }
                value={
                  <Box display="flex">
                    <Typography color="primary" variant="h3">
                      {lastData.rain}
                    </Typography>
                    <Typography color="primary" variant="h6">
                      {' '}
                      %
                    </Typography>
                  </Box>
                }
              />
            </Grid>
            <Grid item xs>
              <Card
                IconArea={
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <AirIcon
                      sx={{ fontSize: 100, color: theme.palette.success.light }}
                    />
                    <Typography variant="overline" textAlign="center">
                      Velocidade do Vento
                    </Typography>
                  </Box>
                }
                value={
                  <Box display="flex">
                    <Typography
                      color={theme.palette.success.light}
                      variant="h3"
                    >
                      {lastData.windVelocity}
                    </Typography>
                    <Typography
                      color={theme.palette.success.light}
                      variant="body1"
                    >
                      {' '}
                      Km/h
                    </Typography>
                  </Box>
                }
              />
            </Grid>
          </Grid>
        </>
      )}
      {data && data.reports && data.reports.length > 0 && (
        <Grid
          sx={{ background: theme.palette.common.white }}
          container
          spacing={2}
          padding={1}
          paddingX={2}
          justifyContent="center"
        >
          <Grid
            item
            xs={12}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Pagination
              color="primary"
              count={data.totalPages}
              page={page}
              onChange={(_, pageSelected) => setPage(pageSelected)}
            />
          </Grid>
          <Grid item xs={12}>
            <Table
              autoHeight
              rows={data.reports || []}
              hideFooterPagination
              hideFooter
            />
          </Grid>
        </Grid>
      )}
      <Loading open={isLoading} />
    </>
  );
};

export default Dashboard;
