class Users {

    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    getUser(id) {
        var user = this.users.filter(u => u.id === id)[0];
        return user;
    }

    getUserList(room) {
        var newUsers = this.users.filter(u => u.room === room);
        var userNames = newUsers.map(u => u.name);
        return userNames;
    }

}

module.exports = {Users}