import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';
import { AddTeamPage } from './AddTeamPage'
import { UpdateTeamPage } from './UpdateTeamPage'
import InfoIcon from '@material-ui/icons/Info';
import { getAllTeams, removeTeam } from '../../../until/httpService'


class _Teams extends Component {
    constructor(props) {
        super(props)
        const user = JSON.parse(sessionStorage.getItem("loginUser"))
        if (!user) {
            this.props.history.push('/')
        }
        this.state = {
            teams: [],
            teamSelected: [],
            diaglog: false,
            infoDialog: false,
            addTeamDialog: false

        }
        this.handleClick = this.handleClick.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this)
    }
    componentDidMount() {
        toast.configure()
        getAllTeams().then((result) => {
            this.setState({ teams: result.data })


        })

    }


    handleClick(Team) {
        removeTeam(Team._id).then((result) => {
            console.log(result)
            window.location.reload(false);

        })
        toast.success(`Teams ${Team.teamName} deleted`)

    }

    handleClickOpen() {
        this.setState({ dialogMsg: true })
    };

    handleClose() {
        this.setState({ dialogMsg: false })

    };

    render() {
        const { teams, infoDialog, addTeamDialog, diaglog, teamSelected } = this.state
        return (
            <>
                <ul style={{ display: "flex" }}>
                    <li > <AddIcon onClick={() => this.setState({ dialogMsg: true, addTeamDialog: true })} /></li>
                </ul>
                <GridList cols={4} cellHeight={90} >
                    {teams.map((team) => (
                        <GridListTile className="accounts" key={team._id}>
                            <GridListTileBar
                                title={team.teamName}
                                actionIcon={
                                    <IconButton onClick={() => {
                                        this.setState({ accountDialog: false, infoDialog: true, dialogMsg: true, teamSelected: team })

                                    }}>
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
                <Fragment>
                    <Dialog
                        scroll='body'
                        open={this.state.dialogMsg}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title"> {infoDialog ? "Update User" : "Add Team "}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {infoDialog ?
                                    <UpdateTeamPage team={teamSelected} /> : addTeamDialog ? <AddTeamPage /> : ""
                                }

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
          </Button>

                        </DialogActions>
                    </Dialog>
                </Fragment>
            </>
        );
    }
}
export const Teams = withRouter(_Teams)