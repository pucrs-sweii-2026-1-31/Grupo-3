import React, { Component, Suspense, lazy, useMemo, useState, useEffect } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
  createTheme,
  LinearProgress,
  Collapse,
  alpha,
  useTheme,
} from "@mui/material";

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SecurityIcon from '@mui/icons-material/Security';
import StorageIcon from '@mui/icons-material/Storage';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import CodeIcon from '@mui/icons-material/Code';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import AssessmentIcon from '@mui/icons-material/Assessment';

// Remotes
const LoginPage = lazy(() => import("mfe_auth/LoginPage"));
const RegisterPage = lazy(() => import("mfe_auth/RegisterForm"));

const drawerWidth = 280;

const GlobalStyles = () => (
  <style>
    {`
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
      @keyframes pulse {
        0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
        70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
        100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
      }
      .fade-in { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
      .delay-1 { animation-delay: 0.1s; }
      .delay-2 { animation-delay: 0.2s; }
      .delay-3 { animation-delay: 0.3s; }
      .pulse-online {
        width: 10px; height: 10px; border-radius: 50%; background: #10b981;
        display: inline-block; margin-right: 8px; animation: pulse 2s infinite;
      }
      .pulse-offline {
        width: 10px; height: 10px; border-radius: 50%; background: #ef4444;
        display: inline-block; margin-right: 8px; animation: pulse 2s infinite;
        box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
      }
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.1); border-radius: 10px; border: 2px solid transparent; background-clip: content-box; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(148, 163, 184, 0.3); }
    `}
  </style>
);

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, textAlign: 'center', borderRadius: 4, bgcolor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
          <WifiOffIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
          <Typography variant="h6" color="error" fontWeight={800}>Módulo Indisponível</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 400, mx: 'auto', mt: 1 }}>O microfrontend de autenticação não pôde ser carregado. Verifique se o container <b>chave-mfe-auth</b> está rodando.</Typography>
          <Button variant="contained" color="error" sx={{ mt: 3 }} onClick={() => window.location.reload()}>Recarregar Sistema</Button>
        </Box>
      );
    }
    return this.props.children;
  }
}

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/login" replace />;
}

function LoadingFallback() {
  return (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 400 }} spacing={3}>
      <CircularProgress size={40} thickness={5} sx={{ color: 'primary.main', filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.5))' }} />
      <Typography color="text.secondary" fontWeight={700} sx={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.75rem' }}>Sincronizando Módulos...</Typography>
    </Stack>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const items = [
    { label: "Dashboard", icon: <DashboardIcon />, to: "/" },
    { label: "Cadastro", icon: <PersonAddIcon />, to: "/cadastro" },
    { label: "Transparência", icon: <HistoryEduIcon />, to: "/transparency" },
    { label: "Login", icon: <LoginIcon />, to: "/login" },
  ];

  return (
    <Box sx={{ height: "100%", display: 'flex', flexDirection: 'column', bgcolor: isDark ? '#020617' : '#f8fafc' }}>
      <Stack spacing={0.5} sx={{ p: 3, pt: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ 
            width: 44, height: 44, 
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', 
            boxShadow: '0 8px 16px -4px rgba(59,130,246,0.5)',
            border: '2px solid rgba(255,255,255,0.1)'
          }}>
            <SecurityIcon sx={{ fontSize: 24 }} />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1, letterSpacing: '-0.02em' }}>Chave</Typography>
            <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 600, color: 'text.secondary', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Enterprise Stack</Typography>
          </Box>
        </Stack>
      </Stack>

      <Box sx={{ px: 2, my: 1 }}>
        <Divider sx={{ opacity: 0.1 }} />
      </Box>

      <List sx={{ px: 2, py: 2, flex: 1 }}>
        {items.map((item) => {
          const active = location.pathname === item.to;
          return (
            <ListItemButton 
              key={item.to} 
              component={Link} 
              to={item.to} 
              onClick={onNavigate} 
              sx={{ 
                borderRadius: '14px', mb: 1, px: 2, py: 1.2,
                background: active ? `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)` : 'transparent',
                color: active ? 'primary.main' : 'text.secondary',
                '&:hover': { bgcolor: active ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.text.primary, 0.04), color: 'text.primary' },
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
            >
              {active && <Box sx={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 4, bgcolor: 'primary.main', borderRadius: '0 4px 4px 0', boxShadow: '0 0 12px rgba(59,130,246,0.6)' }} />}
              <ListItemIcon sx={{ color: active ? 'primary.main' : 'inherit', minWidth: 42 }}>{React.cloneElement(item.icon as React.ReactElement, { sx: { fontSize: 22 } })}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: active ? 700 : 500, fontSize: '0.92rem' }} />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ p: 3 }}>
        <Box sx={{ 
          p: 2.5, borderRadius: '20px', 
          bgcolor: isDark ? alpha(theme.palette.primary.main, 0.05) : alpha(theme.palette.primary.main, 0.03), 
          border: '1px solid', borderColor: isDark ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.primary.main, 0.08) 
        }}>
          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', mb: 0.5 }}>PUCRS · Eng. Software II</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.7rem' }}>Grupo 3 · Turma 2026/1</Typography>
        </Box>
      </Box>
    </Box>
  );
}

function StatTile({ title, value, subtitle, icon, gradient, delay, endpoint, details: initialDetails }: any) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<'loading' | 'online' | 'offline'>('loading');
  const [refreshing, setRefreshing] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    const checkStatus = async () => {
      const start = Date.now();
      try {
        await fetch(endpoint, { mode: 'no-cors' });
        setLatency(Date.now() - start);
        setStatus('online');
      } catch (err) {
        setStatus('offline');
        setLatency(null);
      } finally {
        setRefreshing(false);
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, [endpoint]);

  const handleReconnect = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRefreshing(true);
    setStatus('loading');
    setTimeout(() => {
      window.location.reload(); // Re-sincroniza o MFE se necessário
    }, 1000);
  };

  return (
    <Card 
      className={`fade-in delay-${delay}`} 
      sx={{ 
        position: 'relative', overflow: 'hidden', height: '100%', 
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        bgcolor: isDark ? 'rgba(15, 23, 42, 0.6)' : '#fff',
        backdropFilter: isDark ? 'blur(12px)' : 'none',
        border: '1px solid',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
        '&:hover': { 
          transform: 'translateY(-6px)', 
          boxShadow: isDark ? '0 20px 40px -12px rgba(0,0,0,0.4)' : '0 20px 40px -12px rgba(0,0,0,0.1)',
          borderColor: alpha(theme.palette.primary.main, 0.3)
        },
        cursor: 'pointer'
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: status === 'offline' ? 'linear-gradient(90deg, #ef4444, #b91c1c)' : gradient }} />
      <CardContent sx={{ p: 3.5 }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <Box>
            <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
              <div className={status === 'online' ? "pulse-online" : "pulse-offline"} />
              <Typography variant="overline" sx={{ fontWeight: 800, color: 'text.secondary', letterSpacing: '0.1em' }}>{title}</Typography>
            </Stack>
            <Typography variant="h5" fontWeight={800}>{value}</Typography>
            <Typography variant="caption" sx={{ fontWeight: 600, color: status === 'offline' ? 'error.main' : 'text.secondary' }}>
              {status === 'loading' ? 'Verificando...' : status === 'online' ? subtitle : 'Serviço Indisponível'}
            </Typography>
          </Box>
          <Stack spacing={1} alignItems="flex-end">
            <Avatar sx={{ 
              width: 52, height: 52,
              background: status === 'offline' ? 'rgba(239,68,68,0.1)' : gradient, 
              color: status === 'offline' ? '#ef4444' : '#fff', 
              boxShadow: isDark ? '0 8px 16px rgba(0,0,0,0.4)' : '0 8px 16px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,0.1)'
            }}>
              {status === 'offline' ? <WifiOffIcon /> : React.cloneElement(icon as React.ReactElement, { sx: { fontSize: 26 } })}
            </Avatar>
            <IconButton size="small" sx={{ opacity: 0.5, transition: 'transform 0.3s', transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }}>
              <KeyboardArrowDownIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ 
            mt: 2.5, p: 2, borderRadius: 3, 
            bgcolor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)', 
            border: '1px solid', 
            borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(4px)'
          }}>
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.65rem' }}>Real-time Health</Typography>
                {latency && <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.1), px: 1, borderRadius: 1 }}>{latency}ms</Typography>}
              </Box>
              
              <Stack direction="row" spacing={1}>
                <Chip 
                  size="small" 
                  label={status === 'online' ? 'Operacional' : status === 'loading' ? 'Sincronizando' : 'Falha Crítica'} 
                  color={status === 'online' ? 'success' : status === 'loading' ? 'primary' : 'error'} 
                  sx={{ fontWeight: 800, height: 20, fontSize: '0.6rem', textTransform: 'uppercase' }} 
                />
              </Stack>

              {initialDetails.map((detail: any, i: number) => (
                <Box key={i}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', fontSize: '0.65rem' }}>{detail.label}</Typography>
                  <Typography variant="body2" fontWeight={600} sx={{ wordBreak: 'break-all', fontSize: '0.75rem', opacity: 0.9 }}>{detail.value}</Typography>
                </Box>
              ))}
              
              <Button 
                size="small" 
                variant="contained" 
                fullWidth 
                onClick={handleReconnect}
                disabled={refreshing}
                sx={{ 
                  mt: 1, py: 0.8, fontWeight: 800, fontSize: '0.7rem',
                  boxShadow: 'none',
                  '&:hover': { boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }
                }}
              >
                {refreshing ? 'Sincronizando...' : 'Tentar Reconexão'}
              </Button>
            </Stack>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
}

function TransparencyPage() {
  const members = [
    { name: "Rafael Reis", logs: ["prompt_log_2026-05-11_rafael.json", "prompt_log_2026-05-11_rafael_current.json", "prompt_log_2026-05-11_rafael_recovered.json", "prompt_log_2026-05-05_rafael.json", "prompt_log_2026-05-04_rafael.json"] },
    { name: "Daniel", logs: ["prompt_log_2026-05-08_daniel.json", "prompt_log_2026-05-07_daniel.json", "prompt_log_2026-05-03_daniel.json", "prompt_log_2026-05-02_daniel.json", "prompt_log_2026-04-30_daniel.json"] },
    { name: "Gustavo Henrique", logs: ["prompt_log_2026-05-04_gustavo-henrique.json", "prompt_log_2026-05-03_gustavo-henrique.json", "prompt_log_2026-04-30_gustavo-henrique.json"] },
    { name: "João Wiskow", logs: ["prompt_log_2026-05-09_joao-wiskow.json", "prompt_log_2026-05-06_joao-wiskow.json", "prompt_log_2026-04-30_joao-wiskow.json"] },
    { name: "Davi Asculski", logs: ["prompt_log_2026-05-05_daviasculski.json"] },
    { name: "Matheus Masera", logs: ["prompt_log_2026-05-06_matheusmasera12.json"] },
  ];

  return (
    <Stack spacing={5}>
      <Box className="fade-in">
        <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: '-0.04em' }}>Transparência</Typography>
        <Typography color="text.secondary" variant="subtitle1" fontWeight={500}>Logs de interação com IA (Prompt Engineering) do Grupo 3.</Typography>
      </Box>

      <Grid container spacing={3}>
        {members.map((member, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Card className={`fade-in delay-${(i % 3) + 1}`} sx={{ border: '1px solid divider' }}>
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" spacing={2.5} alignItems="center" sx={{ mb: 3 }}>
                  <Avatar sx={{ 
                    width: 52, height: 52, 
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    boxShadow: '0 8px 16px rgba(59,130,246,0.2)'
                  }}>
                    {member.name[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight={800}>{member.name}</Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Membro Core</Typography>
                  </Box>
                </Stack>
                <Divider sx={{ mb: 2, opacity: 0.5 }} />
                <List dense sx={{ px: 0 }}>
                  {member.logs.map((log, j) => (
                    <ListItemButton 
                      key={j} 
                      component="a" 
                      href={`https://github.com/pucrs-sweii-2026-1-31/Grupo-3/blob/main/.ai_log/${log}`} 
                      target="_blank"
                      sx={{ borderRadius: 2, mb: 0.5 }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}><CodeIcon fontSize="small" sx={{ color: 'primary.main' }} /></ListItemIcon>
                      <ListItemText 
                        primary={log} 
                        primaryTypographyProps={{ fontWeight: 600, fontSize: '0.85rem' }} 
                        secondary="Clique para auditar log" 
                      />
                    </ListItemButton>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

function Dashboard() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const stats = [
    { 
      title: "Backend", value: "JWT", subtitle: "Autenticação ativa", icon: <SecurityIcon />, gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', delay: 1,
      endpoint: "http://localhost:3001/auth",
      details: [
        { label: "Ponto de Extremidade (Endpoint)", value: "http://localhost:3001/auth" },
        { label: "Banco de Dados", value: "PostgreSQL (chave-postgres)" }
      ]
    },
    { 
      title: "Remote MFE", value: "Auth", subtitle: "Módulo federado", icon: <ViewModuleIcon />, gradient: 'linear-gradient(135deg, #10b981, #059669)', delay: 2,
      endpoint: "http://localhost:4001/remoteEntry.js",
      details: [
        { label: "Contêiner", value: "chave-mfe-auth" },
        { label: "Entrada Remota", value: "http://localhost:4001/remoteEntry.js" }
      ]
    },
    { 
      title: "MiniStack", value: "Infra", subtitle: "Gateway AWS Mock", icon: <StorageIcon />, gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', delay: 3,
      endpoint: "http://localhost:4566/_localstack/health",
      details: [
        { label: "Serviços", value: "S3, RDS, API Gateway" },
        { label: "Ponto de Acesso AWS", value: "http://localhost:4566" }
      ]
    },
    { 
      title: "Avaliações", value: "12", subtitle: "Competências", icon: <AssessmentIcon />, gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', delay: 4,
      endpoint: "http://localhost:3001/api/assessments/health",
      details: [
        { label: "Total", value: "12 avaliações" },
        { label: "Último Sync", value: "Sincronizado agora" }
      ]
    },
  ];

  return (
    <Stack spacing={5}>
      <Box className="fade-in" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Box>
          <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: '-0.04em' }}>Dashboard <span style={{ color: theme.palette.primary.main }}>Overview</span></Typography>
          <Typography color="text.secondary" variant="subtitle1" fontWeight={500}>Monitoramento em tempo real do sistema Chave.</Typography>
        </Box>
        <Chip icon={<CheckCircleIcon />} label="System Operational" color="success" sx={{ fontWeight: 800, px: 1, mb: 1 }} />
      </Box>

      <Grid container spacing={3}>
        {stats.map((stat, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <StatTile {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card className="fade-in delay-2" sx={{ height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={4}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main' }}>
                    <IntegrationInstructionsIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight={800}>Status da Integração</Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>Saúde global dos micro-serviços</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                  {['Shell Host', 'Module Federation', 'Bearer JWT', 'PostgreSQL', 'Terraform'].map((label, i) => (
                    <Chip key={i} label={label} variant="outlined" sx={{ fontWeight: 700, borderWidth: '2px', borderColor: 'divider' }} />
                  ))}
                </Stack>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
                    <Typography variant="subtitle2" fontWeight={700}>Cobertura de Testes Unitários</Typography>
                    <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 900 }}>96.4%</Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={96.4} 
                    sx={{ 
                      height: 10, borderRadius: 5, bgcolor: alpha(theme.palette.action.hover, 0.5),
                      '& .MuiLinearProgress-bar': { borderRadius: 5, background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #10b981)' } 
                    }} 
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card className="fade-in delay-3" sx={{ 
            background: isDark ? 'linear-gradient(135deg, #0f172a 0%, #020617 100%)' : 'linear-gradient(135deg, #3b82f6, #8b5cf6)', 
            color: '#fff', height: '100%', position: 'relative', overflow: 'hidden', border: 'none',
            boxShadow: '0 20px 40px -12px rgba(59,130,246,0.3)'
          }}>
            <Box sx={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', filter: 'blur(50px)' }} />
            <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
              <Stack spacing={3}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <TrendingUpIcon />
                  <Typography variant="h5" fontWeight={800}>Resumo Executivo</Typography>
                </Stack>
                <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
                  Arquitetura de microfrontends garantindo escalabilidade e isolamento total de domínios.
                </Typography>
                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
                <Stack spacing={1.5}>
                  <Typography variant="caption" sx={{ opacity: 0.8, fontWeight: 700, textTransform: 'uppercase' }}>Ready for production</Typography>
                  <Typography variant="h6" fontWeight={800}>Release v1.0.0 Stable</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>Uptime: 99.9% · Latência &lt; 50ms</Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}

function MainLayout({ children, mode, onToggleMode }: { children: React.ReactNode, mode: string, onToggleMode: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isDark = mode === 'dark';
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="fixed" elevation={0} sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar sx={{ height: 72 }}>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(true)} sx={{ mr: 2, display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexGrow: 1 }}>
            <Box sx={{ 
              width: 32, height: 32, borderRadius: '8px', bgcolor: 'primary.main', 
              alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
              display: { xs: 'none', sm: 'flex' }
            }}>
              <SecurityIcon sx={{ fontSize: 18, color: '#fff' }} />
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={800} sx={{ lineHeight: 1.2 }}>Chave</Typography>
              <Typography variant="caption" sx={{ display: { xs: 'none', md: 'block' }, color: 'text.secondary', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Orquestrador de Competências</Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', borderRadius: '12px', p: 0.5, mr: 1 }}>
              <Tooltip title={isDark ? 'Tema claro' : 'Tema escuro'}>
                <IconButton onClick={onToggleMode} size="small" sx={{ p: 1 }}>
                  {isDark ? <LightModeOutlinedIcon sx={{ fontSize: 20 }} /> : <DarkModeOutlinedIcon sx={{ fontSize: 20 }} />}
                </IconButton>
              </Tooltip>
            </Box>
            <Tooltip title="Sair do Sistema">
              <IconButton onClick={logout} size="small" sx={{ p: 1, bgcolor: alpha(theme.palette.error.main, 0.1), color: 'error.main', '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.2) } }}>
                <LogoutIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: drawerWidth, border: 'none' } }}
      >
        <SidebarContent onNavigate={() => setMobileOpen(false)} />
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{ display: { xs: "none", md: "block" }, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" } }}
        open
      >
        <SidebarContent />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 3, md: 5 }, ml: { md: `${drawerWidth}px` }, width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Toolbar sx={{ height: 72 }} />
        <Box sx={{ flex: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
}

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: "#3b82f6" },
      secondary: { main: "#10b981" },
      background: {
        default: mode === "dark" ? "#020617" : "#f8fafc",
        paper: mode === "dark" ? "#0f172a" : "#ffffff",
      },
      text: {
        primary: mode === 'dark' ? '#f8fafc' : '#020617',
        secondary: mode === 'dark' ? '#94a3b8' : '#64748b',
      },
      divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
      h3: { fontWeight: 800, letterSpacing: '-0.04em' },
      h4: { fontWeight: 800, letterSpacing: '-0.03em' },
      h5: { fontWeight: 800, letterSpacing: '-0.02em' },
      h6: { fontWeight: 700 },
      button: { fontWeight: 800, textTransform: 'none' }
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? 'rgba(2, 6, 23, 0.7)' : 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid',
            borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
            boxShadow: 'none',
            color: mode === 'dark' ? '#f8fafc' : '#020617',
          }
        }
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === 'dark' ? '#020617' : '#ffffff',
            borderRight: '1px solid',
            borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
          }
        }
      },
      MuiButton: { styleOverrides: { root: { borderRadius: 12, padding: '10px 24px' } } },
      MuiCard: { 
        styleOverrides: { 
          root: { 
            borderRadius: 24, 
            backgroundImage: 'none',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '1px solid',
            borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
          } 
        } 
      },
    }
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <LoginPage onLogin={(token: string) => { localStorage.setItem("token", token); window.location.href = "/"; }} />
              </Suspense>
            </ErrorBoundary>
          } />
          <Route path="/cadastro" element={
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <RegisterPage />
              </Suspense>
            </ErrorBoundary>
          } />
          <Route path="/transparency" element={
            <PrivateRoute>
              <MainLayout mode={mode} onToggleMode={() => setMode((current) => current === "dark" ? "light" : "dark")}>
                <TransparencyPage />
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path="/" element={
            <PrivateRoute>
              <MainLayout mode={mode} onToggleMode={() => setMode((current) => current === "dark" ? "light" : "dark")}>
                <Dashboard />
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
