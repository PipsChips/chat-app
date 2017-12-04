class Users {
    constructor (name, room) {
        this.users = [];
    }

    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);

        return user;
    }

    removeUser(id) {
        var removedUser;
        this.users.forEach((user, index) => {
            if (user.id === id) {
                removedUser = user;
                this.users.splice(index, 1);
            }
        });

        return removedUser;
    }

    getUser(id) {
        return this.users.find((user) => user.id === id);
    }

    getUserList(room) {
        var users = this.users.filter((user) => {
            return user.room === room;
        });

        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = {Users};