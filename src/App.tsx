import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 

import { AuthProvider } from './contexts/AuthProvider';
import { PacientesProvider } from './contexts/PacientesProvider';

import 'sweetalert2/dist/sweetalert2.css';

import AuthLayout from "./layout/AuthLayout";
import SessionLayout from "./layout/SessionLayout";

import Login from "./pages/public/Login";
import SignUp from "./pages/public/SignUp";
import Confirm from './pages/public/Confirm';
import RecoverAccount from './pages/public/RecoverAccount';
import ResetPassword from "./pages/public/ResetPassword";

import AdmonVet from "./pages/private/AdmonVet";
import Profile from "./pages/private/Profile";
import Citas from "./pages/private/Citas";

const App = (): JSX.Element => {
  return (
    <Router>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />}/>
              <Route path="/signup" element={<SignUp />}/>
              <Route path="/confirm/:token" element={<Confirm/>}/>
              <Route path="/recover-account" element={<RecoverAccount/>}/>
              <Route path="/reset-password/:token" element={<ResetPassword/>}/>
            </Route>

            <Route path="/me" element={<SessionLayout />}>
                <Route index element={<AdmonVet />}/>
                <Route path="/me/profile" element={<Profile />}/>
                <Route path="/me/citas" element={<Citas />}/>
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;