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
  alpha,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SecurityIcon from '@mui/icons-material/Security';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

const DRAWER_WIDTH = 280;

interface ShellLayoutProps {
  children: React.ReactNode;
  mode: 'light' | 'dark';
  onToggleMode: () => void;
}

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, to: '/' },
  { label: 'Cadastro', icon: <PersonAddIcon />, to: '/cadastro' },
  { label: 'Transparência', icon: <SecurityIcon />, to: '/transparency' },
  { label: 'Login', icon: <LoginIcon />, to: '/login' },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Brand */}
      <Stack spacing={0.5} sx={{ p: 3, pt: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              width: 44,
              height: 44,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              boxShadow: '0 8px 16px -4px rgba(59,130,246,0.5)',
              border: '2px solid rgba(255,255,255,0.1)',
            }}
          >
            <SecurityIcon sx={{ fontSize: 24 }} />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1, letterSpacing: '-0.02em' }}>
              Chave
            </Typography>
            <Typography
              variant="caption"
              sx={{ 
                fontSize: '0.65rem', 
                fontWeight: 600, 
                color: 'text.secondary',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              Enterprise Stack
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <Box sx={{ px: 2, my: 2 }}>
        <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.5) }} />
      </Box>

      {/* Navigation */}
      <List sx={{ px: 2, py: 1, flex: 1 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <ListItemButton
              key={item.to}
              component={Link}
              to={item.to}
              onClick={onNavigate}
              sx={{
                borderRadius: '14px',
                mb: 1,
                px: 2,
                py: 1.2,
                background: active 
                  ? `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)` 
                  : 'transparent',
                color: active ? 'primary.main' : 'text.secondary',
                '&:hover': {
                  bgcolor: active ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.text.primary, 0.04),
                  color: 'text.primary',
                },
                position: 'relative',
                transition: 'all 0.3s ease',
              }}
            >
              {active && (
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    left: 0, 
                    top: '20%', 
                    bottom: '20%', 
                    width: 4, 
                    bgcolor: 'primary.main',
                    borderRadius: '0 4px 4px 0',
                    boxShadow: '0 0 12px rgba(59,130,246,0.6)'
                  }} 
                />
              )}
              <ListItemIcon
                sx={{
                  color: active ? 'primary.main' : 'inherit',
                  minWidth: 42,
                }}
              >
                {React.cloneElement(item.icon as React.ReactElement, { sx: { fontSize: 22 } })}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: active ? 700 : 500,
                  fontSize: '0.92rem',
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* Footer Info Card */}
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            p: 2.5,
            borderRadius: '20px',
            bgcolor: isDark ? alpha(theme.palette.primary.main, 0.05) : alpha(theme.palette.primary.main, 0.03),
            border: '1px solid',
            borderColor: isDark ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.primary.main, 0.08),
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box 
            sx={{ 
              position: 'absolute', 
              top: -20, 
              right: -20, 
              width: 60, 
              height: 60, 
              borderRadius: '50%', 
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              filter: 'blur(20px)'
            }} 
          />
          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', mb: 0.5 }}>
            PUCRS · Eng. Software II
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.7rem' }}>
            Grupo 3 · Turma 2026/1
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
  const isDark = mode === 'dark';

  const logout = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (t) => t.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ height: 72 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexGrow: 1 }}>
            <Box 
              sx={{ 
                width: 32, 
                height: 32, 
                borderRadius: '8px', 
                bgcolor: 'primary.main', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
                display: { xs: 'none', sm: 'flex' }
              }}
            >
              <SecurityIcon sx={{ fontSize: 18, color: '#fff' }} />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={800}
                sx={{
                  fontSize: '1rem',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2
                }}
              >
                Chave
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: { xs: 'none', md: 'block' },
                  color: 'text.secondary',
                  fontWeight: 600,
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                Orquestrador de Competências
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                borderRadius: '12px',
                p: 0.5,
                mr: 1
              }}
            >
              <Tooltip title={isDark ? 'Ativar Modo Claro' : 'Ativar Modo Escuro'}>
                <IconButton onClick={onToggleMode} size="small" sx={{ p: 1 }}>
                  {isDark ? <LightModeOutlinedIcon sx={{ fontSize: 20 }} /> : <DarkModeOutlinedIcon sx={{ fontSize: 20 }} />}
                </IconButton>
              </Tooltip>
            </Box>
            
            <Tooltip title="Sair do Sistema">
              <IconButton 
                onClick={logout} 
                size="small" 
                sx={{ 
                  p: 1,
                  bgcolor: alpha(theme.palette.error.main, 0.1),
                  color: 'error.main',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.error.main, 0.2),
                  }
                }}
              >
                <LogoutIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Sidebar logic remains same with styled SidebarContent */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            border: 'none',
          },
        }}
      >
        <SidebarContent onNavigate={() => setMobileOpen(false)} />
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
        open
      >
        <SidebarContent />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 3, md: 5 },
          ml: { md: `${DRAWER_WIDTH}px` },
          maxWidth: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Toolbar sx={{ height: 72 }} />
        <Box sx={{ flex: 1, position: 'relative' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
