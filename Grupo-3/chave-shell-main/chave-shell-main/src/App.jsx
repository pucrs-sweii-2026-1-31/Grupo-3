import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Importa o componente LoginPage exposto pelo MFE de Autenticação
const LoginPage = lazy(() => import("mfe_auth/LoginPage"));

// Simulação de proteção de rota
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function Dashboard() {
  return (
    <div style={{ padding: 40, fontFamily: "sans-serif", textAlign: "center" }}>
      <h1 style={{ color: "#1976d2" }}>Chave — Portal Principal</h1>
      <p>Você está logado no sistema de gestão de estoque.</p>
      <div style={{ marginTop: 24 }}>
        <button
          style={{ padding: "10px 20px", cursor: "pointer" }}
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Sair do Sistema
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Suspense é obrigatório para componentes carregados via Module Federation */}
      <Suspense fallback={<div style={{ padding: 20 }}>Carregando MFE de Autenticação...</div>}>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage
                // A prop onLogin é executada pelo MFE quando o usuário clica em entrar
                onLogin={() => {
                  localStorage.setItem("token", "fake-session-token");
                  window.location.href = "/";
                }}
              />
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}