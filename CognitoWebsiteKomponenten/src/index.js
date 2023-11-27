import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import 'bootstrap/dist/css/sign-in.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './components/App';
import Login from './components/login';
import Konfig from './components/konfig';
import { Account } from './components/Accounts/Account';
import Signup from './components/signup';
import ChangePassword from './components/Accounts/ChangePassword';
import VerifyEmail from './components/verifyEmail';


const root = document.getElementById('root');
const rootElement = createRoot(root);

rootElement.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verifyEmail" element={<VerifyEmail />} />
      <Route path="/login" element={<Account><Login /></Account>} />
      <Route path="/changepassword" element={<Account><ChangePassword /></Account>} />
      <Route path="/konfig" element={<Konfig />} />
    </Routes>
  </Router>
);
