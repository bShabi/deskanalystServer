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

export default function TeamPage() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [addTeamPage, setAddTeamPage] = React.useState(false);
  const [removeTeamPage, setRemoveTeamPage] = React.useState(false);
  const [updateTeamPage, setUpdateTeamPage] = React.useState(false);
  const [searchTeamPage, setSearchTeamPage] = React.useState(false);

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
        setAddTeamPage(true)
        console.log("success")
        break;
      case 'Delete':
        setRemoveTeamPage(true)
        console.log("success")
        break;
      case 'Update':
        setUpdateTeamPage(true)
        console.log("success")
        break;
      case 'Search':
        setSearchTeamPage(true)
        console.log("success")
        break;

      default:
        break;
    }
  }

  return (

    <>
      {
        addTeamPage ? <Redirect to={{
          pathname: '/Manager/AddTeam',
        }
        } /> : null
      }
      {
        removeTeamPage ? <Redirect to={{
          pathname: '/Manager/RemoveTeam',
        }} /> : null
      }
      {
        updateTeamPage ? <Redirect to={{
          pathname: '/Manager/UpdateUser',
        }} /> : null
      }
      {
        searchTeamPage ? <Redirect to={{
          pathname: '/Manager/SearchUser',
        }} /> : null
      }
      <div>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Team
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
