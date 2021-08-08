const { addUser, removeUser, getUser, getUsersInRoom, getRooms, resetData } = require('../src/utils/users')

// Test user variables
const testUser1 = {
    id: 1,
    username: 'samplename1',
    room: 'sampleroom1',
    password: 'samplepassword1'
}

const testUser2 = {
    id: 2,
    username: 'samplename2',
    room: 'sampleroom2',
    password: 'sampleroom2'
}

const testUser3 = {
    id: 3,
    username: 'samplename3',
    room: 'sampleroom1',
    password: 'samplepassword1'
}

const lockSign = ' 🔒'
const duplicateUserErrorMessage = 'Username already exists!'
const wrongPasswordErrorMessage = 'Please enter correct room password!'

beforeEach(() => {
    resetData()
    addUser({
        id: testUser1.id,
        username: testUser1.username,
        room: testUser1.room,
        password: testUser1.password
    })
    addUser({
        id: testUser3.id,
        username: testUser3.username,
        room: testUser3.room,
        password: testUser3.password
    })
})

test('Should add a new user and a new public room without a lock', () => {
    const user = addUser({
        id: testUser2.id,
        username: testUser2.username,
        room: testUser2.room,
        password: ''
    })

    expect(user).toMatchObject({
        user: {
            id: testUser2.id,
            username: testUser2.username,
            room: testUser2.room,
        }
    })

    expect(getRooms()).toMatchObject([{
        name: testUser1.room + lockSign,
        number: 2
    }, {
        name: testUser2.room,
        number: 1
    }])
})

test('Should add a new user and a new room with a lock', () => {
    const user = addUser({
        id: testUser2.id,
        username: testUser2.username,
        room: testUser2.room,
        password: testUser2.password
    })

    expect(user).toMatchObject({
        user: {
            id: testUser2.id,
            username: testUser2.username,
            room: testUser2.room
        }
    })

    expect(getRooms()).toMatchObject([{
        name: testUser1.room + lockSign,
        number: 2
    }, {
        name: testUser2.room + lockSign,
        number: 1
    }])
})

test('Should not add a user with existing username', () => {
    const user = addUser({
        id: testUser2.id,
        username: testUser1.username,
        room: testUser1.room,
        password: testUser1.password
    })

    expect(user.error).toBe(duplicateUserErrorMessage)
})

test('Should not add a user with incorrect room password', () => {
    const user = addUser({
        id: testUser2.id,
        username: testUser2.username,
        room: testUser1.room,
        password: testUser2.password
    })

    expect(user.error).toBe(wrongPasswordErrorMessage)
})

test('Should get a list of users in a room', () => {
    const users = getUsersInRoom(testUser1.room)

    expect(users).toMatchObject([{ 
        id: 1, username: 'samplename1', room: 'sampleroom1'
    }, {
        id: 3, username: 'samplename3', room: 'sampleroom1'
    }])
})

test('Should find a user by id', () => {
    const user = getUser(testUser1.id)

    expect(user).toMatchObject({
        id: testUser1.id,
        username: testUser1.username,
        room: testUser1.room
    })
})

test('Should remove one of users of a room and then the room should still exist', () => {
    const user = removeUser(testUser1.id)

    expect(user).toMatchObject({
        id: testUser1.id,
        username: testUser1.username,
        room: testUser1.room
    })

    expect(getRooms().length).toBe(1)
})

test('Should remove all users of a room and then the room should not exist', () => {
    removeUser(testUser1.id)
    removeUser(testUser3.id)

    expect(getRooms().length).toBe(0)
})