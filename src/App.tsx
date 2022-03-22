import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import AuthLayout from "./layout/AuthLayout";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Confirm from './pages/Confirm';
import RecoverAccount from './pages/RecoverAccount';
import ResetPassword from "./pages/ResetPassword";

const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/confirm/:token" element={<Confirm/>}/>
          <Route path="/recover-account" element={<RecoverAccount/>}/>
          <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;