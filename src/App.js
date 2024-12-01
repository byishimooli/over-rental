import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './componets/SignUpForm'; 
import LoginForm from './componets/LoginForm';     
import LandingPage from './componets/LandingForm';  
import HomePage from './componets/HomePage';
import AddProperty from './componets/AddProperty';
import AdminDashboard from './componets/AdminDashBoard'; 
import ForgotPassword from './componets/ForgetPassword';
import ResetPassword from './componets/reset-password';

const App = () => {

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/landingpage" element={<LandingPage />} /> 
        <Route path="/home" element={<HomePage />} />
        <Route path="/addproperty" element={<AddProperty />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin Dashboard Route */}
        <Route path="/admindashboard/*" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
