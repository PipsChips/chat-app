const expect = require('expect');
const {Users} = require('./users.js');

describe("Users", () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Ante1',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Ante2',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Ante3',
            room: 'Node Course'
        }];
    });

    it("should add new user", () => {
        var users = new Users();
        var user = {id: 12, name: 'Ante', room: 'Room 1'};   
        
        var res = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it("should remove user", () => {
        var userId = '2';
        var user = users.removeUser(userId);

        expect(user.id).toEqual(userId);
        expect(users.users.length).toBe(2);
    });

    it("should not remove user", () => {
        var userId = '2222';
        var user = users.removeUser(userId);
        
        expect(user).toNotExist;
        expect(users.users.length).toBe(3);
    });

    it("should find user", () => {
        var userId = '2';
        var user = users.getUser(userId);
        expect(user.id).toEqual(userId);
    });

    it("should not find user", () => {
        var userId = '2222';
        var user = users.getUser(userId);
        expect(user).toNotExist();
    });

    it("should return names for node course", () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Ante1', 'Ante3']);
    });

    it("should return names for react course", () => {
        var userList = users.getUserList('React Course');

        expect(userList).toEqual(['Ante2']);
    });
});
