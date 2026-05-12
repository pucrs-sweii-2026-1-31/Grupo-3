import LoginForm from '../components/LoginForm';
import { AuthProvider } from '../hooks/useAuth';

interface LoginPageProps {
  onLogin?: (token: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <AuthProvider>
      <LoginForm onLogin={onLogin} />
    </AuthProvider>
  );
}
