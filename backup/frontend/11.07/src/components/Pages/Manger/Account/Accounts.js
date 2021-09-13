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
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import { AddAccountPage } from './AddAccountPage'
import { UpdateAccountPage } from './UpdateAccountPage'
import InfoIcon from '@material-ui/icons/Info';
import { getTeamNameById, getAllUsers, removeUser } from '../../../until/httpService'

class _Accounts extends Component {
    constructor(props) {
        super(props)
        const user = JSON.parse(sessionStorage.getItem("loginUser"))
        const permission = user ? user.permission : null
        if (!(permission === 'Owner')) {
            this.props.history.push('/')
        }
        this.state = {
            accounts: [],
            dialogMsg: false,
            infoDialog: false,
            accountDialog: false,
            accountSelected: null


        }

        this.handleClick = this.handleClick.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this)
    }
    componentDidMount() {
        const { account } = this.state
        toast.configure()
        getAllUsers().then((result) => {
            this.setState({ accounts: result.data })
        })
    }



    handleClick(account) {
        removeUser(account).then((result) => {
            console.log(result)
            window.location.reload(false);
            toast.success(`Account ${account.firstName} deleted`)

        })

    }

    handleClickOpen() {
        this.setState({ dialogMsg: true })
    };

    handleClose() {
        this.setState({ dialogMsg: false, infoDialog: false })

    };

    render() {
        const { accounts, infoDialog, accountDialog, accountSelected } = this.state

        return (
            <>
                <Fragment>
                    <ul style={{ display: "flex", textAlign: 'center' }}>
                        <li > <AddIcon
                            style={{ textAlign: 'center' }}
                            onClick={() => this.setState({ dialogMsg: true, accountDialog: true })} /></li>
                    </ul>
                    <div className="container">
                        <div className="row" style={{
                            border: '1px solid black'
                        }}>
                            <div className="col-4" >
                                Owners:
                        </div>
                            <div className="col">
                                <GridList cols={3} cellHeight={90} >
                                    {accounts.filter(user => user.permission === 'Owner').map((account) => (
                                        <GridListTile className="accounts" key={account._id}>
                                            <GridListTileBar
                                                title={`${account.firstName}  ${account.lastName}`}
                                                subtitle={account.email}
                                                actionIcon={
                                                    <IconButton onClick={() => {
                                                        console.log(account.teamid)
                                                        if (account.teamid === null) {
                                                            this.setState({ accountDialog: false, infoDialog: true, dialogMsg: true, accountSelected: account })
                                                        }
                                                        else {
                                                            getTeamNameById(account.teamid).then((result) => {
                                                                account.nameTeam = result.data
                                                                this.setState({ accountDialog: false, infoDialog: true, dialogMsg: true, accountSelected: account })
                                                            })
                                                        }
                                                    }}>
                                                        <InfoIcon />
                                                    </IconButton>
                                                }
                                            />
                                        </GridListTile>
                                    ))}
                                </GridList>
                            </div>
                        </div>
                        <div className="row" style={{
                            border: '1px solid black'
                        }}>
                            <div className="col-4">
                                Analyst
                    </div>
                            <div className="col">
                                <GridList cols={3} cellHeight={90} >
                                    {accounts.filter(user => user.permission === 'Analyst').map((account) => (
                                        <GridListTile className="accounts" key={account._id}>
                                            <GridListTileBar
                                                title={`${account.firstName}  ${account.lastName}`}
                                                subtitle={account.email}
                                                actionIcon={
                                                    <IconButton onClick={() => {
                                                        console.log(account)
                                                        if (account.teamid === null) {
                                                            this.setState({ accountDialog: false, infoDialog: true, dialogMsg: true, accountSelected: account })
                                                        }
                                                        else {
                                                            getTeamNameById(account.teamid).then((result) => {
                                                                account.nameTeam = result.data
                                                                this.setState({ accountDialog: false, infoDialog: true, dialogMsg: true, accountSelected: account })
                                                            })
                                                        }
                                                    }}>
                                                        <InfoIcon />
                                                    </IconButton>
                                                }
                                            />
                                        </GridListTile>
                                    ))}
                                </GridList>
                            </div>
                        </div>
                        <div className="row" style={{
                            border: '1px solid black'
                        }}>
                            <div className="col-4">
                                Coach
                            </div>
                            <div className="col">
                                <GridList cols={3} cellHeight={90} >
                                    {accounts.filter(user => user.permission === 'Coach').map((account) => (
                                        <GridListTile className="accounts" key={account._id}>
                                            <GridListTileBar
                                                title={`${account.firstName}  ${account.lastName}`}
                                                subtitle={account.email}
                                                actionIcon={
                                                    <IconButton onClick={() => {
                                                        console.log(account.teamid)
                                                        if (account.teamid === null) {
                                                            console.log("null")

                                                            this.setState({ accountDialog: false, infoDialog: true, dialogMsg: true, accountSelected: account })
                                                        }
                                                        else {
                                                            console.log("in")
                                                            getTeamNameById(account.teamid).then((result) => {
                                                                account.nameTeam = result.data
                                                                this.setState({ accountDialog: false, infoDialog: true, dialogMsg: true, accountSelected: account })

                                                            })

                                                        }
                                                    }}>
                                                        <InfoIcon />
                                                    </IconButton>
                                                }
                                            />
                                        </GridListTile>
                                    ))}
                                </GridList>
                            </div>
                        </div>
                    </div>
                    <Fragment>
                        <Dialog
                            scroll='body'
                            open={this.state.dialogMsg}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title"> {infoDialog ? "Update User" : "Add User "}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {infoDialog ?
                                        <UpdateAccountPage account={accountSelected} /> : accountDialog ? <AddAccountPage /> : ""
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
                </Fragment>
            </>
        );
    }
}
export const Accounts = withRouter(_Accounts)