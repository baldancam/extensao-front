import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Login from "./pages/Autentication/Login";
import Noticia from "./pages/Users/Noticia";
import Navegacao from "./components/@fixed/Navegacao";
import Perfil from "./pages/Users/Perfil";
import Cardápio from "./pages/Users/Cardápio";
import Turma from "./pages/Admin/Turma";
import { useContext } from "react";
import { AuthContext } from "./context/Auth";
import NoticiaAdmin from "./pages/Admin/NoticiaAdmin";
import Cadastrar from "./pages/Admin/Cadastrar";

const ProtectedRoute = ({ role }: any) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role.includes("ADMIN") && user.role !== "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  if (role.includes("PAI") && user.role !== "PAI") {
    return <Navigate to="/menu" replace />;
  }

  return <Outlet />;
};

const PublicRoute = ({ children }: any) => {
  const { user } = useContext(AuthContext);

  if (user) {
    return user.role === "ADMIN" ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/menu" replace />
    );
  } else {
    <Navigate to="/" replace />;
  }

  return children;
};

// Definindo o roteamento
const IndexRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        index
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route element={<ProtectedRoute role={["PAI"]} />}>
        <Route path="/menu" element={<Navegacao />}>
          <Route index element={<Noticia />} />
          <Route path="cardapio" element={<Cardápio />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute role={["ADMIN"]} />}>
        <Route path="/admin" element={<Navegacao />}>
          <Route index element={<Turma />} />
          <Route path="noticia/:id?" element={<NoticiaAdmin />} />
          <Route path="cadastrar" element={<Cadastrar />} />
        </Route>
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={IndexRouter} />;
};

export default App;
