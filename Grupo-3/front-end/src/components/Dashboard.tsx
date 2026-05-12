import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
  Avatar,
  LinearProgress,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import StorageIcon from '@mui/icons-material/Storage';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
}

function StatCard({ title, value, subtitle, icon, gradient, delay }: StatCardProps) {
  return (
    <Card
      className={`fade-in-up fade-in-up-delay-${delay}`}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: gradient,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <Box>
            <Typography variant="overline" color="text.secondary" sx={{ fontSize: '0.7rem', letterSpacing: 1.2 }}>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={800} sx={{ mt: 0.5 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              background: gradient,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            {icon}
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const stats: StatCardProps[] = [
    {
      title: 'Backend',
      value: 'JWT',
      subtitle: 'Autenticação ativa',
      icon: <SecurityIcon sx={{ fontSize: 24 }} />,
      gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      delay: 1,
    },
    {
      title: 'Microfrontend',
      value: 'MFE',
      subtitle: 'Auth federado',
      icon: <ViewModuleIcon sx={{ fontSize: 24 }} />,
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      delay: 2,
    },
    {
      title: 'Infraestrutura',
      value: 'Docker',
      subtitle: 'Gateway local',
      icon: <StorageIcon sx={{ fontSize: 24 }} />,
      gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
      delay: 3,
    },
    {
      title: 'Avaliações',
      value: '12',
      subtitle: 'Competências mapeadas',
      icon: <AssessmentIcon sx={{ fontSize: 24 }} />,
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
      delay: 4,
    },
  ];

  const integrations = [
    { label: 'Shell Host', color: 'primary' as const, status: true },
    { label: 'Module Federation', color: 'success' as const, status: true },
    { label: 'Bearer JWT', color: 'info' as const, status: true },
    { label: 'REST API', color: 'secondary' as const, status: true },
    { label: 'PostgreSQL', color: 'warning' as const, status: true },
  ];

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Box className="fade-in-up">
        <Typography variant="h3" fontWeight={800}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
          Visão geral da plataforma Chave — Autoavaliação de Competências
        </Typography>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={2.5}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Integration Status & Activity */}
      <Grid container spacing={2.5}>
        {/* Integration */}
        <Grid item xs={12} md={7}>
          <Card className="fade-in-up fade-in-up-delay-2">
            <CardContent sx={{ p: 3 }}>
              <Stack spacing={2.5}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CheckCircleIcon color="success" />
                  <Typography variant="h6">Status das Integrações</Typography>
                </Stack>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {integrations.map((item) => (
                    <Chip
                      key={item.label}
                      label={item.label}
                      color={item.color}
                      variant="outlined"
                      size="medium"
                      icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
                      sx={{ fontWeight: 500 }}
                    />
                  ))}
                </Stack>

                {/* Progress bars */}
                <Stack spacing={1.5} sx={{ mt: 1 }}>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">Cobertura de Testes</Typography>
                      <Typography variant="caption" fontWeight={600}>78%</Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={78}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'action.hover',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">Disponibilidade API</Typography>
                      <Typography variant="caption" fontWeight={600}>99.9%</Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={99.9}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'action.hover',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                          background: 'linear-gradient(90deg, #10b981, #06b6d4)',
                        },
                      }}
                    />
                  </Box>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Summary */}
        <Grid item xs={12} md={5}>
          <Card
            className="fade-in-up fade-in-up-delay-3"
            sx={{
              height: '100%',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #7c3aed 100%)',
              color: '#fff',
              '&:hover': { transform: 'translateY(-2px)' },
            }}
          >
            <CardContent sx={{ p: 3, height: '100%' }}>
              <Stack spacing={2} sx={{ height: '100%' }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <TrendingUpIcon />
                  <Typography variant="h6" fontWeight={700}>Resumo do Projeto</Typography>
                </Stack>
                <Stack spacing={1.5} sx={{ flex: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <PeopleOutlineIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Arquitetura Microfrontend com Module Federation
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <SecurityIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Autenticação JWT com Spring Boot
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <StorageIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      PostgreSQL + Docker Compose
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <ViewModuleIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      CI/CD com GitHub Actions
                    </Typography>
                  </Stack>
                </Stack>
                <Chip
                  label="PUCRS · Eng. Software II · 2026/1"
                  sx={{
                    alignSelf: 'flex-start',
                    bgcolor: 'rgba(255,255,255,0.15)',
                    color: '#fff',
                    fontWeight: 500,
                    backdropFilter: 'blur(4px)',
                  }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
