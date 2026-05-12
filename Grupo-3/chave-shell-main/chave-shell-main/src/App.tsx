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
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import WifiOffIcon from '@mui/icons-material/WifiOff';

// Remotes
const LoginPage = lazy(() => import("mfe_auth/LoginPage"));
const RegisterPage = lazy(() => import("mfe_auth/RegisterForm"));

import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import CodeIcon from '@mui/icons-material/Code';

const drawerWidth = 270;

const GlobalStyles = () => (
  <style>
    {`
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
        70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
        100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
      }
      @keyframes pulseError {
        0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
        70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
        100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
      }
      .fade-in { animation: fadeInUp 0.5s ease-out forwards; opacity: 0; }
      .delay-1 { animation-delay: 0.1s; }
      .delay-2 { animation-delay: 0.2s; }
      .delay-3 { animation-delay: 0.3s; }
      .pulse-online {
        width: 8px; height: 8px; border-radius: 50%; background: #10b981;
        display: inline-block; margin-right: 8px; animation: pulse 2s infinite;
      }
      .pulse-offline {
        width: 8px; height: 8px; border-radius: 50%; background: #ef4444;
        display: inline-block; margin-right: 8px; animation: pulseError 2s infinite;
      }
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(100, 116, 139, 0.2); border-radius: 3px; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(100, 116, 139, 0.4); }
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
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error">Módulo indisponível</Typography>
          <Typography color="text.secondary">Não foi possível carregar o microfrontend solicitado.</Typography>
          <Button variant="outlined" sx={{ mt: 2 }} onClick={() => window.location.reload()}>Recarregar Página</Button>
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
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 400 }} spacing={2}>
      <CircularProgress size={32} thickness={5} sx={{ color: 'primary.main' }} />
      <Typography color="text.secondary" fontWeight={500}>Carregando módulo...</Typography>
    </Stack>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  const items = [
    { label: "Dashboard", icon: <DashboardIcon />, to: "/" },
    { label: "Cadastro", icon: <PersonAddIcon />, to: "/cadastro" },
    { label: "Transparência", icon: <HistoryEduIcon />, to: "/transparency" },
    { label: "Login", icon: <LoginIcon />, to: "/login" },
  ];

  return (
    <Box sx={{ height: "100%", display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      <Stack spacing={0.5} sx={{ p: 2.5 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ width: 40, height: 40, background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}>
            <SecurityIcon sx={{ fontSize: 20 }} />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={800} sx={{ lineHeight: 1.2 }}>Chave</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', letterSpacing: 0.5 }}>Autoavaliação de Competências</Typography>
          </Box>
        </Stack>
      </Stack>
      <Divider sx={{ opacity: 0.6 }} />
      <List sx={{ px: 1.5, py: 2, flex: 1 }}>
        {items.map((item) => {
          const active = location.pathname === item.to;
          return (
            <ListItemButton 
              key={item.to} 
              component={Link} 
              to={item.to} 
              onClick={onNavigate} 
              sx={{ 
                borderRadius: 2, mb: 0.5, px: 2,
                bgcolor: active ? 'primary.main' : 'transparent',
                color: active ? '#fff' : 'text.primary',
                '&:hover': { bgcolor: active ? 'primary.dark' : 'action.hover' },
                transition: 'all 0.2s ease'
              }}
            >
              <ListItemIcon sx={{ color: active ? '#fff' : 'text.secondary', minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: active ? 700 : 500, fontSize: '0.9rem' }} />
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ p: 2 }}>
        <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'action.hover', border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.65rem' }}>PUCRS · Eng. Software II</Typography>
          <Typography variant="caption" fontWeight={600} color="primary" sx={{ fontSize: '0.65rem' }}>Grupo 3 · 2026/1</Typography>
        </Box>
      </Box>
    </Box>
  );
}

function StatTile({ title, value, subtitle, icon, gradient, delay, endpoint, details: initialDetails }: any) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<'loading' | 'online' | 'offline'>('loading');
  const [latency, setLatency] = useState<number | null>(null);

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
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 10000); // Check every 10s
    return () => clearInterval(interval);
  }, [endpoint]);

  return (
    <Card 
      className={`fade-in delay-${delay}`} 
      sx={{ 
        position: 'relative', overflow: 'hidden', height: '100%', 
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(0,0,0,0.1)' },
        cursor: 'pointer'
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: gradient }} />
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <Box>
            <Stack direction="row" alignItems="center" sx={{ mb: 0.5 }}>
              <div className={status === 'online' ? "pulse-online" : status === 'offline' ? "pulse-offline" : ""} />
              <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: 1 }}>{title}</Typography>
            </Stack>
            <Typography variant="h4" fontWeight={800}>{value}</Typography>
            <Typography variant="caption" color={status === 'offline' ? 'error.main' : 'text.secondary'}>
              {status === 'loading' ? 'Verificando...' : status === 'online' ? subtitle : 'Serviço Offline'}
            </Typography>
          </Box>
          <Stack spacing={1} alignItems="flex-end">
            <Avatar sx={{ background: status === 'offline' ? '#fee2e2' : gradient, color: status === 'offline' ? '#ef4444' : '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              {status === 'offline' ? <WifiOffIcon /> : icon}
            </Avatar>
            <IconButton size="small" sx={{ opacity: 0.5 }}>
              {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Stack>
        </Stack>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider sx={{ my: 2 }} />
          <Stack spacing={1.5}>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Status em Tempo Real</Typography>
              <Chip 
                size="small" 
                label={status === 'online' ? 'Operacional' : 'Indisponível'} 
                color={status === 'online' ? 'success' : 'error'} 
                sx={{ mt: 0.5, fontWeight: 700, height: 20, fontSize: '0.65rem' }} 
              />
              {latency && <Typography variant="caption" sx={{ ml: 1, opacity: 0.7 }}>Latência: {latency}ms</Typography>}
            </Box>
            {initialDetails.map((detail: any, i: number) => (
              <Box key={i}>
                <Typography variant="caption" color="text.secondary" display="block">{detail.label}</Typography>
                <Typography variant="body2" fontWeight={600} sx={{ wordBreak: 'break-all' }}>{detail.value}</Typography>
              </Box>
            ))}
            <Button size="small" variant="outlined" fullWidth sx={{ mt: 1, py: 0.5, fontSize: '0.7rem' }}>Tentar Reconexão</Button>
          </Stack>
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
    <Stack spacing={4}>
      <Box className="fade-in">
        <Typography variant="h3" fontWeight={900}>Transparência</Typography>
        <Typography color="text.secondary" variant="subtitle1">Logs de interação com IA (Prompt Engineering) de todos os membros do Grupo 3.</Typography>
      </Box>

      <Grid container spacing={3}>
        {members.map((member, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Card className={`fade-in delay-${(i % 3) + 1}`}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>{member.name[0]}</Avatar>
                  <Typography variant="h6" fontWeight={700}>{member.name}</Typography>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <List dense>
                  {member.logs.map((log, j) => (
                    <ListItemButton key={j} component="a" href={`https://github.com/pucrs-sweii-2026-1-31/Grupo-3/blob/main/.ai_log/${log}`} target="_blank">
                      <ListItemIcon><CodeIcon fontSize="small" /></ListItemIcon>
                      <ListItemText primary={log} secondary="Ver log no GitHub" />
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
      title: "Avaliações", value: "12", subtitle: "Competências", icon: <CheckCircleIcon />, gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', delay: 4,
      endpoint: "http://localhost:3001/api/assessments/health", // Placeholder or real endpoint
      details: [
        { label: "Total", value: "12 avaliações" },
        { label: "Última", value: "Hoje, 14:20" }
      ]
    },
  ];

  return (
    <Stack spacing={4}>
      <Box className="fade-in">
        <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: '-0.02em' }}>Dashboard</Typography>
        <Typography color="text.secondary" variant="subtitle1">Monitoramento em tempo real do sistema Chave.</Typography>
      </Box>

      <Grid container spacing={3}>
        {stats.map((stat, i) => (
          <Grid item xs={12} md={4} key={i}>
            <StatTile {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card className="fade-in delay-2">
            <CardContent sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <CheckCircleIcon color="success" />
                  <Typography variant="h6" fontWeight={700}>Status da Integração</Typography>
                </Stack>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip label="Shell host" color="primary" variant="outlined" sx={{ fontWeight: 600 }} />
                  <Chip label="Module Federation" color="success" variant="outlined" sx={{ fontWeight: 600 }} />
                  <Chip label="Bearer JWT" color="info" variant="outlined" sx={{ fontWeight: 600 }} />
                  <Chip label="PostgreSQL" color="warning" variant="outlined" sx={{ fontWeight: 600 }} />
                  <Chip label="Terraform Provisioned" color="secondary" variant="outlined" sx={{ fontWeight: 600 }} />
                </Stack>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" color="text.secondary" gutterBottom display="block">Saúde Global do Sistema</Typography>
                  <LinearProgress variant="determinate" value={98} sx={{ height: 8, borderRadius: 4, bgcolor: 'action.hover', '& .MuiLinearProgress-bar': { borderRadius: 4, background: 'linear-gradient(90deg, #3b82f6, #10b981)' } }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="fade-in delay-3" sx={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff', height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <TrendingUpIcon />
                  <Typography variant="h6" fontWeight={700}>Métricas Atuais</Typography>
                </Stack>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  O sistema utiliza arquitetura de microfrontends para garantir escalabilidade e isolamento de domínios.
                </Typography>
                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
                <Stack spacing={1}>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>Último Deploy: Hoje, 23:42</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>Uptime: 99.9%</Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}

function ShellLayout({ children, mode, onToggleMode }: { children: React.ReactNode, mode: string, onToggleMode: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="fixed" elevation={0} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(12px)', backgroundColor: mode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)', borderBottom: '1px solid', borderColor: 'divider', color: 'text.primary' }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(true)} sx={{ mr: 2, display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 800, fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
            Chave <span style={{ fontWeight: 400, opacity: 0.7 }}>— Sistema de Autoavaliação</span>
          </Typography>
          <Stack direction="row" spacing={1}>
            <Tooltip title={mode === 'dark' ? 'Tema claro' : 'Tema escuro'}>
              <IconButton onClick={onToggleMode} color="inherit">
                {mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Sair">
              <IconButton onClick={logout} color="inherit">
                <LogoutIcon />
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
        sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box", borderRight: 'none' } }}
      >
        <SidebarContent onNavigate={() => setMobileOpen(false)} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{ display: { xs: "none", md: "block" }, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box", borderRight: 'none', boxShadow: '4px 0 24px rgba(0,0,0,0.02)' } }}
        open
      >
        <Toolbar />
        <SidebarContent />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, ml: { md: `${drawerWidth}px` }, width: '100%' }}>
        <Toolbar />
        {children}
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
        default: mode === "dark" ? "#0f172a" : "#f8fafc",
        paper: mode === "dark" ? "#1e293b" : "#ffffff",
      },
      text: {
        primary: mode === 'dark' ? '#f1f5f9' : '#0f172a',
        secondary: mode === 'dark' ? '#94a3b8' : '#475569',
      }
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
      h3: { fontWeight: 900 },
      h4: { fontWeight: 800 },
      h6: { fontWeight: 700 },
      button: { fontWeight: 700, textTransform: 'none' }
    },
    components: {
      MuiButton: { styleOverrides: { root: { borderRadius: 10, boxShadow: 'none', '&:hover': { boxShadow: 'none' } } } },
      MuiCard: { styleOverrides: { root: { borderRadius: 16, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' } } },
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
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
          <Route path="/register" element={<Navigate to="/cadastro" replace />} />
          <Route path="/cadastro" element={
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <RegisterPage />
              </Suspense>
            </ErrorBoundary>
          } />
          <Route path="/transparency" element={
            <PrivateRoute>
              <ShellLayout mode={mode} onToggleMode={() => setMode((current) => current === "dark" ? "light" : "dark")}>
                <TransparencyPage />
              </ShellLayout>
            </PrivateRoute>
          } />
          <Route path="/" element={
            <PrivateRoute>
              <ShellLayout mode={mode} onToggleMode={() => setMode((current) => current === "dark" ? "light" : "dark")}>
                <Dashboard />
              </ShellLayout>
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
