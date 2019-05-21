import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from 'Src/pages/index';
import Form from 'Src/pages/form';
import 'Src/main.css'

function AppRouter() {
  return (
    <Router>
        <Route path="/" exact component={Index} />
        <Route path="/form/" component={Form} />
    </Router>
  );
}

export default AppRouter;
