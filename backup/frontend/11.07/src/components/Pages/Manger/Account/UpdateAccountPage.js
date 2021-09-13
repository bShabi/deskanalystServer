import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios'
import { getAllTeams, updateUser, removeUser } from '../../../until/httpService'

class _UpdateAccountPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account: this.props.account,
            oringalAccount: this.props.account,
            allTeam: []

        }
        this.changeProfile = this.changeProfile.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleRemoveUser = this.handleRemoveUser.bind(this)
    }
    componentDidMount() {
        toast.configure()
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
    changeProfile(name, value) {

        console.log(name + "===>" + value)
        this.setState(prevState => ({
            account: {                   // object that we want to update
                ...prevState.account,    // keep all other key-value pairs
                [name]: value      // update the value of specific key
            }
        }), console.log(this.state.account))
    }

    handleSubmit(e) {
        const { account, oringalAccount } = this.state
        const prevTeam = oringalAccount.teamid
        console.log(prevTeam)
        updateUser(account, prevTeam).then((result) => {
            if (result.data === "Update User") {
                toast.success("Update Account-" + account.email)
            }
        })
        setTimeout(() => {
            window.location.reload(false)

        }, 1500)
    }
    handleRemoveUser(e) {
        const { account } = this.state
        removeUser(account).then(() => {
            toast.success("User removed")

        })
        setTimeout(() => {
            window.location.reload(false)
        }, 1500)
    }


    validEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };


    render() {
        const { account, allTeam } = this.state

        return (
            <>

                <Fragment>
                    <div>
                        <form >
                            <lable> First Name: </lable> <input type="text" defaultValue={account.firstName} />
                            <lable>Last Name </lable> <input type="text" defaultValue={account.lastName} />
                            <label>Email </label> <input type='email' name="email" defaultValue={account.email} onChange={(e) => this.changeProfile(e.target.name, e.target.value)} />
                            <label>Team:</label>
                            <select
                                id='team'
                                name='teamid'
                                onChange={(e) =>
                                    this.changeProfile(e.target.name, e.target.value)
                                }>
                                <option disabled selected value>
                                    {account.nameTeam}
                                </option>
                                {allTeam.map((team, index) => (
                                    <option key={index} value={team.key}> {team.value} </option>
                                ))}
                            </select>
                            <label>Premission </label>
                            <select
                                id='permission'
                                name='permission'
                                onChange={(e) =>
                                    this.changeProfile(e.target.name, e.target.value)
                                }>
                                <option disabled selected value>
                                    {account.permission}
                                </option>
                                <option value='Coach'> Coach </option>
                                <option value='Analyst'> Analyst </option>
                                <option value='Owner'> Owner </option>

                            </select>
                            <label>Password</label>
                            <input type='password' defaultValue={account.password} onChange={(e) =>
                                this.changeProfile(e.target.name, e.target.value)} />
                            <button type='button' className='btn' onClick={this.handleSubmit} >
                                Update
                </button>
                            <button type='button' className='btn-Remove' onClick={this.handleRemoveUser}>Remove User</button>

                        </form>
                    </div>
                </Fragment>
            </>
        )
    }
}
export const UpdateAccountPage = withRouter(_UpdateAccountPage)
