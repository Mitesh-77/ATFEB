import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Navbar from "./components/navbar/Navbar.js"
import Sidebar from "./components/sidebar/Sidebar.js"
import Main from "./components/main/Main.js"
import Home from './layouts/Home';
import Login from "./admin/Login"
import NotFound from './pages/NotFound.js';
import top10City from './layouts/Topcity';
import top10State from './layouts/Topstate';
import YearlySales from './layouts/Yearly';
import MonthlySales from './layouts/Monthly';
import DailySales from './layouts/Day';


const App = () => {

  return (
    <div className="Container">
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/top10city' component={top10City} />
        <Route exact path='/top10state' component={top10State} />
        <Route exact path='/yearlySales' component={YearlySales} />
        <Route exact path='/monthlySales' component={MonthlySales} />
        <Route exact path='/dailySales' component={DailySales} />
        <Route exact path='/login' component={Login} />
        <Route component={NotFound} />
      </Switch>
    </div >


  );
}

export default App;
