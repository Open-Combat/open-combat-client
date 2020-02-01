export function registerSocketIO ( socketio ) {

    socketio.on( 'connection', socket => {
        console.log( 'connected to client' )
        socket.emit('recieveSync', {
            1 : {
                test : { a : 1, b : 2 }
            }
        })
    })

    socketio.listen( 3001 )
    console.log('Setup socketio')
}
