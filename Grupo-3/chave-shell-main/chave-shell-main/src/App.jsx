import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const LoginPage = lazy(() => import("mfe_auth/LoginPage"));
const RegisterPage = lazy(() => import("mfe_auth/RegisterForm"));

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function Dashboard() {
  return (
    <div style={{ padding: 40, fontFamily: "sans-serif", textAlign: "center" }}>
      <h1 style={{ color: "#1976d2" }}>Chave — Sistema Ativo</h1>
      <p>Micro-frontends sincronizados com sucesso.</p>
      <button 
        style={{ marginTop: 20, padding: "10px 20px", cursor: "pointer" }}
        onClick={() => { localStorage.clear(); window.location.href = "/login"; }}
      >
        Sair
      </button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ padding: 20 }}>Carregando módulos...</div>}>
        <Routes>
          <Route 
            path="/login" 
            element={<LoginPage onLogin={() => { localStorage.setItem("token", "true"); window.location.href = "/"; }} />} 
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}