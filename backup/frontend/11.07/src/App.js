import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { TeamSqoud } from './components/Pages/TeamSqoud';
import { Games } from './components/Pages/Games';
import { NewGame } from './components/Pages/NewGame';
import { Home } from './components/Pages/Home';
import './components/css/App.css';
import ShowPlayers from './components/Pages/ShowPlayers';
import { LoginPage } from './components/Pages/LoginPage';
import { Accounts } from './components/Pages/Manger/Account/Accounts';
// import { RemoveAccountPage } from './components/Pages/Manger/Account/RemoveAccountPage';
import { AddTeamPage } from './components/Pages/Manger/Team/AddTeamPage';
import { Teams } from './components/Pages/Manger/Team/Teams'



const App = () => {





  return (
    <Router>
      <div >
        <Navbar />
        <div >
          <Switch>
            <Route exact path='/' component={LoginPage} />
            <Route exact path='/Teams' component={Teams} />
            <Route exact path='/Accounts' component={Accounts} />
            <Route exact path='/TeamSqoud' component={TeamSqoud} />
            <Route exact path='/Manager/AddTeam' component={AddTeamPage} />
            <Route exact path='/Games' component={Games} />
            <Route exact path='/NewGame' component={() => <NewGame />}
            />
            <Route exact path='/Home' component={Home} />
            <Route exact path='/ShowPlayers' component={ShowPlayers} />
            <Route exact path='/LoginPage' component={LoginPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
