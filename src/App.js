import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login-page.pages';
import ForgotPasswordPage from './pages/forgot-password-page.pages';
import PasswordChangeSuccess from './pages/password-change-success-page.pages';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route exact path='/forgotPassword' element={<ForgotPasswordPage />} />
          <Route exact path='/passwordChanged' element={<PasswordChangeSuccess />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
