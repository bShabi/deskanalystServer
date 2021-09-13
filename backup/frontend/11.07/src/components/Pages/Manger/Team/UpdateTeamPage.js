import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify';
import { deleteUserTeamID, updateTeam, removeTeam, getUsersByTeamid } from '../../../until/httpService'

class _UpdateTeamPage extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.team)
        this.state = {
            team: this.props.team,
            users: null,
            accounts: null

        }
        this.changeProfile = this.changeProfile.bind(this)
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this)
        this.handelSubmitDelete = this.handelSubmitDelete.bind(this)
        this.updateTeamIdFromAccount = this.updateTeamIdFromAccount.bind(this)
    }

    componentDidMount() {
        const { team } = this.state
        toast.configure()
        getUsersByTeamid(team._id)
            .then(
                (response) => {
                    this.setState({ accounts: response.data }, () => console.log(response.data))
                    console.log(this.state.accounts)

                },
                (error) => {
                    console.log(error);
                }
            );

    }
    changeProfile(name, value) {

        console.log(name + "===>" + value)
        this.setState(prevState => ({
            team: {                   // object that we want to update
                ...prevState.team,    // keep all other key-value pairs
                [name]: value      // update the value of specific key
            }
        }), console.log(this.state.team))
    }

    handleSubmitUpdate(e) {
        const { team } = this.state
        console.log(team)
        updateTeam(team).then((result) => {
            if (result.data === "Success Team Update") {
                toast.success("Team Update")
            }
            else {
                toast.success("something worng try again")
            }
        })
        setTimeout(() => {
            window.location.reload(false)

        }, 1500)

    }

    handelSubmitDelete() {
        const { team } = this.state
        console.log(team.account)
        this.updateTeamIdFromAccount(team)



    }
    updateTeamIdFromAccount(team) {
        var users = team.account
        var teamid = team._id

        removeTeam(teamid).then((res) => {
            if (res.data === 'Team Delete')
                toast.success("Team Removed from DB")
            users.forEach(elm => {
                deleteUserTeamID(elm).then((res) => {
                    // console.log(elm)
                    if (res.data === "Success User Team Update")
                        console.log("success")
                })

            })

        })
        // setTimeout(() => {
        //     window.location.reload(false)
        // }, 1500)

    }
    render() {
        const { team, accounts } = this.state
        return (
            <div>
                <form>
                    <input type="text" defaultValue={team.teamName} name="teamName" onChange={(e) =>
                        this.changeProfile(e.target.name, e.target.value)} />
                </form>

                <button type='button' className='btn' onClick={this.handleSubmitUpdate} >
                    Update
                </button>
                <button type='button' className='btn-Remove' onClick={this.handelSubmitDelete} >
                    Remove
                </button>
            </div>
        )
    }
}
export const UpdateTeamPage = withRouter(_UpdateTeamPage)
