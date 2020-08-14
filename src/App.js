import React, {useContext} from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/routes";
import {AuthProvider} from './components/authcontext'

import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from "./components/protectedroute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes />
      </Router>
    </AuthProvider>
  );
}
