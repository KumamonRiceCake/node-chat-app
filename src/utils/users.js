const users = []
const rooms = []

const addUser = ({ id, username, room, password }) => {
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()
    password = password.trim()

    // Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    // Check for existing room
    const existingRoom = rooms.find((chatroom) => { return chatroom.name === room })

    // Validate room password
    if (existingRoom && existingRoom.password !== password) {
        return {
            error: 'Please enter correct room password!'
        }
    }

    // Validate username
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })
    if (existingUser) {
        return {
            error: 'Username already exists!'
        }
    }

    // Store room and increment the number of participants
    if (!existingRoom) {
        rooms.push({
            name: room,
            password: password,
            number: 1
        })
    } else {
        existingRoom.number++
    }

    // Store user
    const user = { id, username, room }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    
    if (index !== -1) {
        const removedUser = users.splice(index, 1)[0]
        leaveRoom(removedUser.room)
        return removedUser
    }
}

const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => users.filter((user) => user.room === room)

const getRooms = () => {
    roomnames = []
    rooms.forEach((room) => {
        if (room.password) {
            roomnames.push({ name: room.name + ' 🔒', number: room.number })
        } else {
            roomnames.push({ name: room.name, number: room.number })
        }
    })

    return roomnames
}

const leaveRoom = (roomname) => {
    rooms.forEach((room) => {
        if (room.name === roomname) {
            room.number--
        }
        if (room.number === 0)
            rooms.pop(room)
    })
}

const resetData = () => {
    users.splice(0, users.length)
    rooms.splice(0, rooms.length)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
    getRooms,
    resetData
}