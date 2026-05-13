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
  IconButton,
  alpha,
  useTheme,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import StorageIcon from '@mui/icons-material/Storage';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
}

const GlobalAnimations = () => (
  <style>
    {`
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .hover-float:hover {
        animation: float 3s ease-in-out infinite;
      }
      .fade-in-up {
        animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        opacity: 0;
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .delay-1 { animation-delay: 0.1s; }
      .delay-2 { animation-delay: 0.2s; }
      .delay-3 { animation-delay: 0.3s; }
      .delay-4 { animation-delay: 0.4s; }
    `}
  </style>
);

function StatCard({ title, value, subtitle, icon, gradient, delay }: StatCardProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Card
      className={`fade-in-up delay-${delay}`}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        '&:hover': {
          '& .icon-bg': {
            transform: 'scale(1.2) rotate(10deg)',
            opacity: 0.2,
          }
        }
      }}
    >
      <Box 
        className="icon-bg"
        sx={{ 
          position: 'absolute', 
          right: -20, 
          bottom: -20, 
          fontSize: 100, 
          color: 'primary.main', 
          opacity: 0.05,
          transition: 'all 0.5s ease',
          pointerEvents: 'none'
        }}
      >
        {icon}
      </Box>
      
      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={2.5}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Avatar
              sx={{
                width: 44,
                height: 44,
                background: gradient,
                boxShadow: isDark ? '0 8px 16px -4px rgba(0,0,0,0.5)' : '0 8px 16px -4px rgba(0,0,0,0.1)',
                border: '2px solid rgba(255,255,255,0.1)',
              }}
            >
              {React.cloneElement(icon as React.ReactElement, { sx: { fontSize: 22 } })}
            </Avatar>
            <IconButton size="small" sx={{ opacity: 0.5, '&:hover': { opacity: 1, bgcolor: alpha(theme.palette.primary.main, 0.1) } }}>
              <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Stack>
          
          <Box>
            <Typography variant="overline" sx={{ fontWeight: 800, color: 'text.secondary', letterSpacing: '0.1em', fontSize: '0.65rem' }}>
              {title}
            </Typography>
            <Typography variant="h5" sx={{ mt: 0.5, fontWeight: 800 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" sx={{ mt: 0.5, color: 'text.secondary', fontWeight: 600, display: 'block' }}>
                {subtitle}
              </Typography>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const stats: StatCardProps[] = [
    {
      title: 'Backend Node',
      value: 'JWT Active',
      subtitle: 'MS de Autenticação OK',
      icon: <SecurityIcon />,
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      delay: 1,
    },
    {
      title: 'Arquitetura',
      value: 'MFE Stack',
      subtitle: 'Module Federation Ativo',
      icon: <ViewModuleIcon />,
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      delay: 2,
    },
    {
      title: 'Infraestrutura',
      value: 'Dockerized',
      subtitle: 'AWS LocalStack Gateway',
      icon: <StorageIcon />,
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
      delay: 3,
    },
    {
      title: 'Avaliações',
      value: '12 Mapeadas',
      subtitle: 'Último sync agora',
      icon: <AssessmentIcon />,
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      delay: 4,
    },
  ];

  const integrations = [
    { label: 'Shell Host', color: 'primary' as const },
    { label: 'MFE Auth', color: 'success' as const },
    { label: 'PostgreSQL', color: 'info' as const },
    { label: 'AWS Mock', color: 'secondary' as const },
    { label: 'GitHub Actions', color: 'warning' as const },
  ];

  return (
    <Box sx={{ position: 'relative' }}>
      <GlobalAnimations />
      
      <Stack spacing={4}>
        {/* Header with Glass Effect */}
        <Box className="fade-in-up" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Box>
            <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 900 }}>
              Dashboard <span style={{ color: theme.palette.primary.main }}>Overview</span>
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, opacity: 0.8 }}>
              Monitoramento em tempo real da plataforma de competências.
            </Typography>
          </Box>
          <Chip 
            icon={<CheckCircleIcon />} 
            label="Sistema Operacional" 
            color="success" 
            sx={{ fontWeight: 800, px: 1, height: 32 }} 
          />
        </Box>

        {/* Stat Cards Grid */}
        <Grid container spacing={3}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <StatCard {...stat} />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Main Status Area */}
          <Grid item xs={12} md={7}>
            <Card className="fade-in-up delay-2" sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={4}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main' }}>
                      <IntegrationInstructionsIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h5">Status da Integração</Typography>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>Saúde global dos serviços</Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                    {integrations.map((item) => (
                      <Chip
                        key={item.label}
                        label={item.label}
                        color={item.color}
                        variant="outlined"
                        sx={{ 
                          fontWeight: 700, 
                          borderWidth: '2px',
                          bgcolor: alpha(theme.palette[item.color].main, 0.05)
                        }}
                      />
                    ))}
                  </Stack>

                  <Stack spacing={3}>
                    <Box>
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
                        <Typography variant="subtitle2">Cobertura de Testes Unitários</Typography>
                        <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 900 }}>96.4%</Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={96.4}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 5,
                            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #10b981)',
                          },
                        }}
                      />
                    </Box>

                    <Box>
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
                        <Typography variant="subtitle2">Uptime do Gateway AWS</Typography>
                        <Typography variant="subtitle2" sx={{ color: 'success.main', fontWeight: 900 }}>99.9%</Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={99.9}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 5,
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

          {/* Premium Info Sidebar */}
          <Grid item xs={12} md={5}>
            <Card
              className="fade-in-up delay-3"
              sx={{
                height: '100%',
                background: isDark 
                  ? 'linear-gradient(135deg, #0f172a 0%, #020617 100%)' 
                  : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                color: isDark ? '#fff' : '#fff',
                position: 'relative',
                overflow: 'hidden',
                border: 'none',
                boxShadow: '0 20px 40px -12px rgba(59,130,246,0.3)'
              }}
            >
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: -50, 
                  right: -50, 
                  width: 200, 
                  height: 200, 
                  borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.1)', 
                  filter: 'blur(50px)' 
                }} 
              />
              
              <CardContent sx={{ p: 4, height: '100%', position: 'relative', zIndex: 1 }}>
                <Stack spacing={4} sx={{ height: '100%' }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>
                      <TrendingUpIcon />
                    </Avatar>
                    <Typography variant="h5" fontWeight={800}>Resumo Executivo</Typography>
                  </Stack>
                  
                  <Stack spacing={2.5} sx={{ flex: 1 }}>
                    {[
                      { icon: <PeopleOutlineIcon />, text: 'Arquitetura MFE escalável' },
                      { icon: <SecurityIcon />, text: 'Auth JWT Security robusto' },
                      { icon: <StorageIcon />, text: 'DevOps com LocalStack' },
                      { icon: <CheckCircleIcon />, text: 'Pipeline CI/CD Full-Pass' },
                    ].map((item, i) => (
                      <Stack key={i} direction="row" alignItems="center" spacing={2}>
                        <Box sx={{ color: 'rgba(255,255,255,0.6)' }}>
                          {React.cloneElement(item.icon as React.ReactElement, { sx: { fontSize: 20 } })}
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 600, opacity: 0.9 }}>
                          {item.text}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>

                  <Box 
                    sx={{ 
                      p: 2, 
                      borderRadius: '16px', 
                      bgcolor: 'rgba(255,255,255,0.1)', 
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)' 
                    }}
                  >
                    <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', mb: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>
                      Pronto para Deploy
                    </Typography>
                    <Typography variant="h6" fontWeight={800}>Release v1.0.0 Stable</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
