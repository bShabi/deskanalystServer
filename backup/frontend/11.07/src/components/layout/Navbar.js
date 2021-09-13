import React, { Component } from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(sessionStorage.getItem('loginUser'));
    const permssion = user ? user.permission : null;
    const firstName = user ? user.firstName : null;
    const lastName = user ? user.lastName : null;


    this.state = {
      title: 'DeskAnalyst System',
      icon: 'fa fa-futbol',
      permssionUser: permssion,
      firstName: firstName,
      lastName: lastName
    };
    this.logout = this.logout.bind(this)
  }
  logout() {
    sessionStorage.clear()
    this.setState({ permssionUser: null })
    window.location.reload(false);
  }

  render() {
    const { icon, firstName, lastName, title, permssionUser } = this.state;
    return (
      <nav className='navbar bg-primary'>
        <h4>
          <i className={icon} /> {title}
        </h4>
        {firstName &&
          <span> Hello  {firstName} {lastName}, [ {permssionUser} ] </span>
        }
        <ul>
          {(permssionUser === 'Coach' || permssionUser === 'Analyst') && (
            <li>
              <NavLink className="nav-links" to='/home' exact activeStyle={{
                color: 'blue',
              }}>
                Home
              </NavLink>
            </li>
          )}
          {(permssionUser === 'Coach' || permssionUser === 'Analyst') && (
            <li>
              <NavLink
                className="nav-links" to='/TeamSqoud' exact activeStyle={{
                  color: 'blue',
                }}>
                Team Sqoud
              </NavLink>
            </li>
          )}
          {(permssionUser === 'Coach' || permssionUser === 'Analyst') && (
            <li>
              <NavLink
                className="nav-links" to='/Games' exact activeStyle={{
                  color: 'blue',
                }}>
                Games
              </NavLink>
            </li>
          )}
          {(permssionUser === 'Analyst') && (
            <li>
              <NavLink
                className="nav-links" to='/NewGame' exact activeStyle={{
                  color: 'blue',
                }}>
                New Game
              </NavLink>
            </li>
          )}
          {permssionUser === 'Owner' && (
            <li>
              <NavLink className="nav-links" to='/Accounts' exact activeStyle={{
                color: 'blue',
              }}>
                Accounts
              </NavLink>
            </li>
          )}
          {permssionUser === 'Owner' && (
            <li>
              <NavLink
                className="nav-links" to='/Teams' exact activeStyle={{
                  color: 'blue',
                }}>
                Teams
              </NavLink>
            </li>
          )}
          {permssionUser && (
            <li>
              <IconButton
                className="nav-links"
                onClick={() => this.logout()}
              >
                <ExitToAppIcon />
              </IconButton>

            </li>
          )}
        </ul>
      </nav >
    );
  }
}
