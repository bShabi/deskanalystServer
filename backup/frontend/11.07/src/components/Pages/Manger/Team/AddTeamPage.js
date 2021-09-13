import React, { Component } from 'react'
import { withRouter } from "react-router";
import axios from 'axios';
import { registerTeamToDB, getAllUsers } from '../../../until/httpService'
import { toast } from 'react-toastify';


class _AddTeamPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teamName: "",
      allAnalyst: [],
      analyst: ""
    }
    this.changeValue = this.changeValue.bind(this)
    this.changeValue = this.changeValue.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  changeValue(name, value) {
    this.setState({
      [name]: value,
    });
  }
  componentDidMount() {
    toast.configure()
    getAllUsers().then((result => {
      const myUsers = [];
      result.data.forEach((user) => {
        if (user.permission === "Analyst")
          myUsers.push({ key: user._id, value: ` ${user.firstName} ${user.lastName} (${user.email})` })

      }
      );
      this.setState({
        allAnalyst: myUsers,
      });
    }))
  }



  changeValue(name, value) {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    const { teamName } = this.state
    registerTeamToDB(teamName).then((response) => {
      console.log(response)
      if (response.data != null) {
        toast.clearWaitingQueue()
        toast.success("Team registered to DB")
      }
      else {
        toast.warning("something worng")
      }

    })
    setTimeout(() => {
      window.location.reload(false)

    }, 1500)

  }


  render() {
    const analysts = this.state.allAnalyst
    return (
      <>

        <div className='form-group'>
          <label> Team Name </label>
          <input
            type='text'
            name='teamName'
            placeholder='Name'
            onChange={(e) =>
              this.changeValue(e.target.name, e.target.value)
            }
          />
        </div>
        {/* <div className='form-group'>
          <label> Analyst </label>
          <select
            id='analyst'
            name='analyst'
            onChange={(e) =>
              this.changeValue(e.target.name, e.target.value)
            }>
            <option disabled selected value>
              Please select a Analyst{' '}
            </option>{' '}
            {analysts.map((analyst, index) => (
              <option key={index} value={analyst.key}> {analyst.value} </option>
            ))}{' '}
          </select>{' '} */}
        {/* </div> */}
        <button onClick={this.handleSubmit} className="btn btn-primary">Register</button>
      </>
    )
  }
}
export const AddTeamPage = withRouter(_AddTeamPage)
