const socket = io()

const roomlistTemplate = document.querySelector('#roomlist-template').innerHTML

socket.on('roomList', (rooms) => {
    const html = Mustache.render(roomlistTemplate, {
        rooms
    })
    
    document.querySelector('#roomlist-sidebar').innerHTML = html
})