import React, {useContext} from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/routes";
import {AuthProvider} from './components/authcontext'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes />
      </Router>
    </AuthProvider>
  );
}
