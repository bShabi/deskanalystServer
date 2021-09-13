import React from 'react';
import { Redirect } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import UpdateIcon from '@material-ui/icons/Update';
import RemoveIcon from '@material-ui/icons/Remove';
import SearchIcon from '@material-ui/icons/Search';
import Accounts from './Accounts'

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function AccountPage() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [addUserPage, setAddUserPage] = React.useState(false);
    const [removeUserPage, setRemoveUserPage] = React.useState(false);
    const [updateUserPage, setUpdateUserPage] = React.useState(false);
    const [searchUserPage, setSearchUserPage] = React.useState(false);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSelect = (event) => {
        const selected = event.currentTarget.getAttribute('name');
        switch (selected) {
            case 'Add':
                setAddUserPage(true)
                console.log("success")
                break;
            case 'Delete':
                setRemoveUserPage(true)
                console.log("success")
                break;
            case 'Update':
                setUpdateUserPage(true)
                console.log("success")
                break;
            case 'Search':
                setSearchUserPage(true)
                console.log("success")
                break;

            default:
                break;
        }
    }

    return (
        <>
            {addUserPage ? <Redirect to={{
                pathname: '/Manager/AddUser',
            }} /> : null}
            {removeUserPage ? <Redirect to={{
                pathname: '/Manager/RemoveUser',
            }} /> : null}
            {updateUserPage ? <Redirect to={{
                pathname: '/Manager/UpdateUser',
            }} /> : null}
            {searchUserPage ? <Redirect to={{
                pathname: '/Manager/SearchUser',
            }} /> : null}

            <div>
                <Button
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                >
                    Account
      </Button>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                // onClick={handleSelect}
                >
                    <StyledMenuItem onClick={handleSelect} name="Add">
                        <ListItemIcon>
                            <AddIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Add" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={handleSelect} name="Delete">
                        <ListItemIcon>
                            <RemoveIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Delete" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={handleSelect} name="Update">
                        <ListItemIcon>
                            <UpdateIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Update" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={handleSelect} name="Search">
                        <ListItemIcon>
                            <SearchIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Search" />
                    </StyledMenuItem>
                </StyledMenu>
            </div>
        </>
    );


}
