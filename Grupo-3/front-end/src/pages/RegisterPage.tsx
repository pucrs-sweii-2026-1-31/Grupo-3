import RegisterForm from '../components/RegisterForm';
import { AuthProvider } from '../hooks/useAuth';

export default function RegisterPage() {
  return (
    <AuthProvider>
      <RegisterForm />
    </AuthProvider>
  );
}
