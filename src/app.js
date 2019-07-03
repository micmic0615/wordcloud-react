import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from 'Src/pages/index';
import Oneword from 'Src/pages/oneword';
import Allchange from 'Src/pages/allchange';
import Form from 'Src/pages/form';
import Pledge from 'Src/pages/pledge';
import 'Src/fonts.css'
import 'Src/main.css'

function AppRouter() {
  return (
    <Router>
        <Route path="/" exact component={Index} />
        <Route path="/oneword/" component={Oneword} />
        <Route path="/allchange/" component={Allchange} />
        <Route path="/form/" component={Form} />
        <Route path="/pledge/" component={Pledge} />
    </Router>
  );
}

export default AppRouter;
