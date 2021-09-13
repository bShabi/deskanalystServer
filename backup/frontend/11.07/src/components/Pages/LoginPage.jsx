import React from 'react';
import loginImg from '../../login.svg';
import '../css/App.css';
import axios from 'axios';
import { withRouter } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { resetPassword, resiterHook } from '../until/httpService'

class _LoginPage extends React.Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(sessionStorage.getItem("loginUser"))
    if (!user) {
      this.props.history.push('/')
    }
    else {
      this.props.history.push('/Home')
    }
    this.state = {
      redirect: false,
      email: '',
      password: '',
      nameTeam: '',
      isCalcOnSubmit: false,
      resetPassPage: false
    };
    this.sendPassword = this.sendPassword.bind(this)
    this.onClickLogin = this.onClickLogin.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClickResetPassword = this.onClickResetPassword.bind(this)
  }
  componentDidMount() {
    toast.configure();
  }

  onChange(name, value) {
    this.setState({
      [name]: value,
    });
  }
  onClickResetPassword(e) {
    e.preventDefault()
    this.setState({ resetPassPage: true })
  }
  sendPassword(e) {
    const { email } = this.state
    resetPassword(email)
      .then((result) => {
        toast.success(result.data)
      })
  }
  onClickLogin(e) {
    const { isCalcOnSubmit } = this.state
    if (isCalcOnSubmit) {
      return
    }
    this.setState({ resetPassPage: false, isCalcOnSubmit: true })
    try {
      e.preventDefault()
      resiterHook().then((result) => {
        console.log("Ben26shabi")
      })
      axios.post('http://localhost:5000/users/login', {
        email: this.state.email,
        password: this.state.password,
      })
        .then(
          (response) => {
            console.log(response);
            if (response.data === null) {
              toast.error('email or password is incorrect');
              toast.clearWaitingQueue();

            } else {
              // console.log(response.data);
              sessionStorage.setItem('loginUser', JSON.stringify(response.data));
              console.log(response.data)
              this.setState({
                nameTeam: response.data.nameTeam,
              });
              this.props.history.push('/Home');
              toast.success('Success login');
              setTimeout(() => {
                window.location.reload(true);

              }, 1800);
            }
            this.setState({ isCalcOnSubmit: false });

          },
          (error) => {
            console.log(error);
            this.setState({ isCalcOnSubmit: false });

          }
        );
    }
    catch (error) {
      console.log(error)
      this.setState({ isCalcOnSubmit: false });

    }
  }

  render() {
    const { resetPassPage } = this.state

    if (resetPassPage) {
      return (
        <>
          <form>
            <div className='formLogin'>

              <div className='form-group'>
                <label htmlFor='username'> Email </label>
                <input
                  type='text'
                  name='email'
                  placeholder='Email'
                  onChange={(e) => this.onChange(e.target.name, e.target.value)}
                />
              </div>
              <button className='btn' onClick={this.sendPassword}>Reset password</button> <br />              <button className='btn' onClick={() => this.setState({ resetPassPage: false })}>Log in</button>
            </div>
          </form>
        </>
      )
    }
    if (!resetPassPage) {
      return (
        <form action='onSubmit'>
          <div className='formLogin'>
            <div className='header'> </div>
            <div className='content'>
              <div className='form'>
                <div className='form-group'>
                  <label htmlFor='username'> Email </label>
                  <input
                    type='text'
                    name='email'
                    placeholder='Email'
                    onChange={(e) => this.onChange(e.target.name, e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'> Password </label>
                  <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={(e) => this.onChange(e.target.name, e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='footer'>
              <button onClick={this.onClickLogin} type='button' className='btn'>
                Login
              </button> <br />
              {/* <button onClick={this.onClickResetPassword} className='btn'>Reset passowrd</button> */}
            </div>
          </div>
          <ToastContainer limit={1} />
        </form>

      );
    }
  }
}

export function nameTeam() {
  return this.state.nameTeam
}
export const LoginPage = withRouter(_LoginPage);
