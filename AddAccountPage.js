import { makeStyles } from '@material-ui/core';
import React, { Fragment } from 'react';
import ManagerControl from '../ManagerControl';
import axios from 'axios';
import { withRouter } from 'react-router';

import { toast } from 'react-toastify';


class _AddAccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      passwordConfirm: null,
      team: '',
      allTeam: [],
      permission: null,
    };
    this.changeValue = this.changeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.registerUserToDB = this.registerUserToDB.bind(this);
    this.validEmail = this.validEmail.bind(this)
    this.getAllTeams = this.getAllTeams.bind(this);
    this.getUserByEmail = this.getUserByEmail.bind(this);
  }
  componentDidMount() {
    this.getAllTeams();
    toast.configure();
  }
  getAllTeams() {
    axios.get('http://localhost:5000/teams/').then((result) => {
      const myTeam = [];
      result.data.forEach((team) => {
        myTeam.push({ key: team._id, value: team.teamName });
      });
      this.setState({
        allTeam: myTeam,
      });
    });
  }
  changeValue(name, value) {
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    var account = this.state;
    var arrData = [];
    Object.entries(account).map(([key, value]) => {
      arrData.push(value);
    });
    for (let value of Object.values(arrData)) {
      if (value == null || String(value).length === 0) {
        toast.error('Please inert a value ');
        return;
      }
    }
    debugger
    if (!(this.validEmail(this.state.email))) {
      toast.error('please make sure your email currect ')
      return
    }


    if ((this.state.password !== this.state.passwordConfirm) && this.state.password.length > 6) {
      toast.error('please make sure your password match');
      return;
    }

    //async 
    this.getUserByEmail().then((response) => {
      if (response.data === null) {
        this.registerUserToDB();
        toast.success("user save to DB successfly")
      } else {
        toast.warning("user already exist")
      }

    })

  }

  validEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  getUserByEmail() {
    return axios
      .get('http://localhost:5000/users/find/' + this.state.email, {
      })
  }

  registerUserToDB() {
    console.log(this.state)
    axios
      .post('http://localhost:5000/users/add', {

        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        team: this.state.team,
        permission: this.state.permission,

      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  render() {
    const teams = this.state.allTeam;
    return (
      <>
        <ManagerControl />
        <Fragment>
          <div>
            <form>
              <div className='base-container'>
                <div className='content'>
                  <div className='image'> </div>
                  <div className='form'>
                    <div className='form-group'>
                      <label id='username'> First Name </label>
                      <input
                        type='text'
                        name='firstName'
                        placeholder='First Name'
                        onChange={(e) =>
                          this.changeValue(e.target.name, e.target.value)
                        }
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='username'> Last Name </label>
                      <input
                        type='text'
                        name='lastName'
                        placeholder='Last name'
                        onChange={(e) =>
                          this.changeValue(e.target.name, e.target.value)
                        }
                      />
                    </div>
                    <div className='form-group'>
                      <label> Team </label>
                      <select
                        id='team'
                        name='team'
                        onChange={(e) =>
                          this.changeValue(e.target.name, e.target.value)
                        }>
                        <option disabled selected value>
                          Please select a Team
                        </option>
                        {teams.map((team, index) => (
                          <option key={index} value={team.key}> {team.value} </option>
                        ))}
                      </select>
                    </div>
                    <div className='form-group'>
                      <label> Email </label>
                      <input
                        type='text'
                        name='email'
                        placeholder='email'
                        onChange={(e) =>
                          this.changeValue(e.target.name, e.target.value)
                        }
                      />
                    </div>
                    <div className='form-group'>
                      <label> Password </label>
                      <input
                        type='password'
                        name='password'
                        placeholder='password'
                        onChange={(e) =>
                          this.changeValue(e.target.name, e.target.value)
                        }
                      />
                    </div>
                    <div className='form-group'>
                      <label> Confirm Password </label>
                      <input
                        type='password'
                        name='passwordConfirm'
                        placeholder='Confirm password'
                        onChange={(e) =>
                          this.changeValue(e.target.name, e.target.value)
                        }
                      />
                    </div>
                    <div className='form-group'>
                      <label> Permission </label>
                      <select
                        id='permission'
                        name='permission'
                        onChange={(e) =>
                          this.changeValue(e.target.name, e.target.value)
                        }>
                        <option disabled selected value>
                          Please select a permission
                        </option>
                        <option value='Coach'> Coach </option>
                        <option value='Analyst'> Analyst </option>
                        <option value='Owner'> Owner </option>

                      </select>
                    </div>
                  </div>
                </div>
                <button type='button' onClick={this.handleSubmit} className='btn'>
                  Register
                </button>
              </div>
            </form>
          </div>
        </Fragment>
      </>
    );
  }
}

export const AddAccountPage = withRouter(_AddAccountPage);
