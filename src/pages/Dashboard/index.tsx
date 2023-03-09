import {
  Air as AirIcon,
  ChevronLeft as ArrowLeftIcon,
  ChevronRight as ArrowRightIcon,
  Cloud as CloudIcon,
  Opacity as OpacityIcon,
  Thermostat as ThermostatIcon,
  TireRepair as PressureIcon,
  Today as TodayIcon
} from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Divider,
  Grid,
  IconButton,
  Pagination,
  Skeleton,
  Typography,
  useTheme
} from '@mui/material';
import {
  addDays,
  format,
  formatDistanceToNow,
  isFuture,
  subDays
} from 'date-fns';
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
  const [date, setDate] = useState(new Date());

  let { data: dayData, isLoading: isLoadingDay } = useFecth(
    currentMachine?.id
      ? `/day/${currentMachine?.id}?day=${format(date, 'MM-dd-yyyy')}`
      : null
  );

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
      {!dayData && (
        <Box
          sx={{ background: theme.palette.common.white, margin: 0 }}
          display="flex"
          flexDirection="column"
        >
          <Skeleton animation="wave" sx={{ margin: 2 }} />
          <Skeleton animation="wave" sx={{ margin: 2 }} />
          <Skeleton animation="wave" sx={{ margin: 2 }} />
          <Skeleton animation="wave" sx={{ margin: 2 }} />
          <Skeleton animation="wave" sx={{ margin: 2 }} />
        </Box>
      )}
      {dayData && (
        <>
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
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h5" fontWeight="bold">
                Resumo do dia
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <IconButton
                onClick={() => setDate(subDays(date, 1))}
                sx={{ marginX: 2 }}
              >
                <ArrowLeftIcon fontSize="medium" />
              </IconButton>

              <Typography component="p" variant="h6" sx={{fontSize: {xs: 10, md: 25}, textAlign: 'center'}}> 
                {format(date, 'PPPP', { locale: ptBR })}
              </Typography>
              <IconButton
                sx={{ marginX: 2 }}
                onClick={() => {
                  if (!isFuture(addDays(date, 1))) setDate(addDays(date, 1));
                }}
              >
                <ArrowRightIcon fontSize="medium" />
              </IconButton>
              <IconButton
                onClick={() => setDate(new Date())}
                sx={{ marginX: 2 }}
              >
                <TodayIcon fontSize="medium" />
              </IconButton>
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
                    <ThermostatIcon color="secondary" sx={{ fontSize: {xs: 50, md: 100} }} />
                    <Typography variant="overline" textAlign="center">
                      Temperatura
                    </Typography>
                  </Box>
                }
                value={
                  <Box display="flex">
                    <Typography color="secondary" variant="h4">
                      {Number(dayData.temperature).toFixed(2)}
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
                      sx={{ fontSize: {xs: 50, md: 100} }}
                    />
                    <Typography variant="overline" textAlign="center">
                      Umidade
                    </Typography>
                  </Box>
                }
                value={
                  <Box display="flex">
                    <Typography color="primary.light" variant="h4">
                      {Number(dayData.humidity).toFixed(2)}
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
                    <PressureIcon color="warning" sx={{ fontSize: {xs: 50, md: 100} }} />{' '}
                    <Typography variant="overline" textAlign="center">
                      Pressão
                    </Typography>
                  </Box>
                }
                value={
                  <Box display="flex">
                    <Typography color={theme.palette.warning.main} variant="h4">
                      {Number(dayData.pressure).toFixed(2)}
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
                    <CloudIcon color="primary" sx={{ fontSize: {xs: 50, md: 100} }} />
                    <Typography variant="overline" textAlign="center">
                      Chuva
                    </Typography>
                  </Box>
                }
                value={
                  <Box display="flex">
                    <Typography color="primary" variant="h4">
                      {Number(dayData.rain).toFixed(2)}
                    </Typography>
                    <Typography color="primary" variant="h6">
                      {' '}
                      mm
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
                      sx={{ fontSize: {xs: 50, md: 100,}, color: theme.palette.success.light }}
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
                      variant="h4"
                     
                    >
                      {Number(dayData.windVelocity).toFixed(2)}
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
          <Grid item xs={12} sx={{ marginTop: 5 }}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Breadcrumbs>
              {' '}
              <Typography color="text.primary">
                Última Atualização:{' '}
                {formatDistanceToNow(new Date(data.reports[0].createdAt), {
                  locale: ptBR,
                  addSuffix: true,
                  includeSeconds: true,
                })}
              </Typography>
            </Breadcrumbs>
          </Grid>
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
      <Loading open={isLoading || isLoadingDay} />
    </>
  );
};

export default Dashboard;
