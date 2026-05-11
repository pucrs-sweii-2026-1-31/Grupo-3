import React, { Component, Suspense, lazy, useMemo, useState } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SecurityIcon from '@mui/icons-material/Security';
import StorageIcon from '@mui/icons-material/Storage';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

const LoginPage = lazy(() => import("mfe_auth/LoginPage"));
const RegisterPage = lazy(() => import("mfe_auth/RegisterForm"));

const drawerWidth = 260;

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3 }}>
          <Typography variant="h6">Modulo indisponivel</Typography>
          <Typography color="text.secondary">Nao foi possivel carregar o microfrontend solicitado.</Typography>
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
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 280 }} spacing={2}>
      <CircularProgress size={28} />
      <Typography color="text.secondary">Carregando modulo...</Typography>
    </Stack>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const items = [
    { label: "Dashboard", icon: <DashboardIcon />, to: "/" },
    { label: "Login", icon: <LoginIcon />, to: "/login" },
    { label: "Cadastro", icon: <PersonAddIcon />, to: "/register" },
  ];

  return (
    <Box sx={{ height: "100%", bgcolor: "background.paper" }}>
      <Stack spacing={1} sx={{ p: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <SecurityIcon color="primary" />
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>Chave</Typography>
            <Typography variant="caption" color="text.secondary">Autoavaliação de Competências</Typography>
          </Box>
        </Stack>
      </Stack>
      <Divider />
      <List sx={{ px: 1, py: 1 }}>
        {items.map((item) => (
          <ListItemButton key={item.to} component={Link} to={item.to} onClick={onNavigate} sx={{ borderRadius: 1 }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

function Dashboard() {
  const cards = [
    { title: "Backend", value: "JWT ativo", icon: <SecurityIcon color="primary" /> },
    { title: "Remote MFE", value: "Auth federado", icon: <ViewModuleIcon color="primary" /> },
    { title: "MiniStack", value: "Gateway local", icon: <StorageIcon color="primary" /> },
  ];

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={700}>Dashboard</Typography>
        <Typography color="text.secondary">Visao inicial da plataforma Chave.</Typography>
      </Box>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        {cards.map((card) => (
          <Card key={card.title} sx={{ flex: 1, borderRadius: 2 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="overline" color="text.secondary">{card.title}</Typography>
                  <Typography variant="h6">{card.value}</Typography>
                </Box>
                {card.icon}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Card sx={{ borderRadius: 2 }}>
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="h6">Status da integracao</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip label="Shell host" color="primary" variant="outlined" />
              <Chip label="Module Federation" color="success" variant="outlined" />
              <Chip label="Bearer JWT" color="info" variant="outlined" />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
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
      <AppBar position="fixed" elevation={0} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(true)} sx={{ mr: 2, display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Chave — Sistema de Autoavaliação de Competências para Pessoas Idosas
          </Typography>
          <Button color="inherit" onClick={onToggleMode}>{mode === "dark" ? "Tema claro" : "Tema escuro"}</Button>
          <IconButton color="inherit" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: drawerWidth } }}
      >
        <SidebarContent onNavigate={() => setMobileOpen(false)} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{ display: { xs: "none", md: "block" }, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" } }}
        open
      >
        <Toolbar />
        <SidebarContent />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, ml: { md: `${drawerWidth}px` } }}>
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
      primary: { main: "#1565c0" },
      secondary: { main: "#00897b" },
      background: {
        default: mode === "dark" ? "#101418" : "#f4f6f8",
      },
    },
    shape: { borderRadius: 8 },
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ShellLayout mode={mode} onToggleMode={() => setMode((current) => current === "dark" ? "light" : "dark")}>
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route
                  path="/login"
                  element={<LoginPage onLogin={(token: string) => { localStorage.setItem("token", token); window.location.href = "/"; }} />}
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </ShellLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
