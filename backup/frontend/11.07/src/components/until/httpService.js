import axios from 'axios'

export function getAllTeams() {
    return axios.get('http://localhost:5000/teams/', {
    })
}
export function registerTeamToDB(teamName) {
    return axios
        .post('http://localhost:5000/teams/add', {
            teamName: teamName
            // analyst: this.state.analyst
        })
}
export function removeTeam(teamid) {
    return axios.delete('http://localhost:5000/teams/remove/' + teamid, {})
}
export function getTeamNameById(teamId) {
    return axios.get('http://localhost:5000/teams/findByTeamId/' + teamId)
}

export function updateTeam(team) {
    const updateTeam = JSON.stringify(team)
    console.log(updateTeam)

}
export function getUsersByTeamid(teamId) {
    return axios.get('http://localhost:5000/users/findByTeamId/' + teamId)
}

export function getAllUsers() {
    return axios.get('http://localhost:5000/users')
}
export function removeUser(account) {

    return axios.post('http://localhost:5000/users/remove/', {
        userTeam: account.teamid,
        userID: account._id
    })
}
export function deleteUserTeamID(userid) {
    return axios.post('http://localhost:5000/users/deleteTeam/' + userid)
}

export function updateUser(user, prevTeam) {
    return axios.post('http://localhost:5000/users/update/' + JSON.stringify(user), {
        prevTeam: prevTeam
    })
}


export function getPlayers(teamID) {
    return axios.get('http://localhost:5000/players/findByTeamid/' + teamID)
}


export function getGames() {
    return axios.get('http://localhost:5000/games')
}
export function getGamesByTeamId(teamID) {
    return axios.get('http://localhost:5000/games/find/' + teamID)
}

export function getPlayersInGame(gameID) {
    return axios.get('http://localhost:5000/players/find/' + gameID)
}
export function getGamesByGameId(gameID) {
    return axios.get('http://localhost:5000/games/findgame/' + gameID)
}

export function resetPassword(email) {
    return axios.get('http://localhost:5000/users/resetpassword/' + email)
}
export function getUserByEmail(email) {
    return axios
        .get('http://localhost:5000/users/find/' + email, {
        })
}
export function registerUserToDB(Accounts) {
    console.log(Accounts)
    return axios
        .post('http://localhost:5000/users/add', {

            firstName: Accounts.firstName,
            lastName: Accounts.lastName,
            email: Accounts.email,
            password: Accounts.password,
            team: Accounts.team,
            permission: Accounts.permission,

        })

}
export function resiterHook() {
    return axios.post('http://localhost:5000/teams/hook')
}