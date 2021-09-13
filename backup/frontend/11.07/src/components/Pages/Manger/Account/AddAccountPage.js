import React, { Fragment } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { getAllTeams, getUserByEmail, registerUserToDB } from '../../../until/httpService'

import { ToastContainer, toast } from 'react-toastify';


class _AddAccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // account: null,
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
    this.validEmail = this.validEmail.bind(this)
    this.validPassword = this.validPassword.bind(this)
  }
  componentDidMount() {
    toast.configure();

    getAllTeams().then((result) => {
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
    }, () => console.log(this.state));
  }
  handleSubmit(e) {
    var { account, email } = this.state;
    var arrData = [];
    Object.entries(this.state).map(([key, value]) => {
      arrData.push(value);
      return arrData
    });
    for (let value of Object.values(arrData)) {
      if (value == null || String(value).length === 0) {
        toast.error('Please inert a value ');
        return;
      }
    }
    if (!(this.validEmail(this.state.email))) {
      toast.error('please make sure your email currect ')
      toast.clearWaitingQueue();

      return
    }
    if (!(this.validPassword(this.state.password))) {
      toast.warning("Your password must be have at least 1 uppercase & 1 lowercase character 1 number")
      toast.clearWaitingQueue();

      return;
    }

    if (this.state.password !== this.state.passwordConfirm) {
      toast.error('please make sure your password match');
      toast.clearWaitingQueue();

      return;
    }

    //async 
    getUserByEmail(email).then((response) => {
      if (response.data === null) {
        registerUserToDB(this.state).then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
        toast.success("user save to DB successfly")
        window.location.reload(false)

      } else {
        toast.warning("user already exist")
      }

    })

  }

  validPassword(password) {
    var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password)
  }

  validEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };




  render() {
    const teams = this.state.allTeam;
    return (
      <>
        <Fragment>
          <div>
            <form method="GET" onSubmit={this.handleSubmit} >
              <div className='base-container'>
                <div className='content'>
                  <div className='image'> </div>
                  <div className='form'>
                    <div className='form-group'>
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
        <ToastContainer limit={3} />

      </>
    );
  }
}

export const AddAccountPage = withRouter(_AddAccountPage);
