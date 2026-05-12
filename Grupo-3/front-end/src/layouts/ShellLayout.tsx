import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SecurityIcon from '@mui/icons-material/Security';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

const DRAWER_WIDTH = 270;

interface ShellLayoutProps {
  children: React.ReactNode;
  mode: 'light' | 'dark';
  onToggleMode: () => void;
}

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, to: '/' },
  { label: 'Login', icon: <LoginIcon />, to: '/login' },
  { label: 'Cadastro', icon: <PersonAddIcon />, to: '/register' },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  const theme = useTheme();

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Brand */}
      <Stack spacing={0.5} sx={{ p: 2.5 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            sx={{
              width: 40,
              height: 40,
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
            }}
          >
            <SecurityIcon sx={{ fontSize: 20 }} />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={800} sx={{ lineHeight: 1.2 }}>
              Chave
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: '0.65rem', letterSpacing: 0.5 }}
            >
              Autoavaliação de Competências
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <Divider />

      {/* Navigation */}
      <List sx={{ px: 1.5, py: 1.5, flex: 1 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <ListItemButton
              key={item.to}
              component={Link}
              to={item.to}
              onClick={onNavigate}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                px: 2,
                py: 1,
                bgcolor: active ? 'primary.main' : 'transparent',
                color: active ? '#fff' : 'text.primary',
                '&:hover': {
                  bgcolor: active ? 'primary.dark' : 'action.hover',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <ListItemIcon
                sx={{
                  color: active ? '#fff' : 'text.secondary',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: active ? 600 : 400,
                  fontSize: '0.9rem',
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* Footer */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.04)',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)',
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
            PUCRS · Eng. Software II
          </Typography>
          <Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
            Grupo 3 · 2026/1
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default function ShellLayout({ children, mode, onToggleMode }: ShellLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const logout = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (t) => t.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 2, display: { md: 'none' } }}
            aria-label="Abrir menu"
          >
            <MenuIcon />
          </IconButton>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ flexGrow: 1 }}>
            <SecurityIcon sx={{ fontSize: 22, color: 'primary.main' }} />
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                fontSize: { xs: '0.9rem', sm: '1.1rem' },
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Chave
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: { xs: 'none', md: 'block' },
                ml: 0.5,
              }}
            >
              — Sistema de Autoavaliação de Competências
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.5}>
            <Tooltip title={mode === 'dark' ? 'Tema claro' : 'Tema escuro'}>
              <IconButton onClick={onToggleMode} size="small" sx={{ color: 'text.primary' }}>
                {mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Sair">
              <IconButton onClick={logout} size="small" sx={{ color: 'text.primary' }}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            bgcolor: 'background.paper',
          },
        }}
      >
        <Toolbar />
        <SidebarContent onNavigate={() => setMobileOpen(false)} />
      </Drawer>

      {/* Permanent Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
          },
        }}
        open
      >
        <Toolbar />
        <SidebarContent />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          ml: { md: `${DRAWER_WIDTH}px` },
          maxWidth: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
