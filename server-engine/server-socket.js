export function registerSocketIO ( socketio ) {

    socketio.on( 'connection', socket => {
        console.log( 'connected to client' )
        socket.emit('recieveSync', {
            player : { 
                player : {},
                camera : {},
                canMove : {},
                collideable : {
                    width : 1,
                    height: 1,
                    depth: 1,
                },
                gravity : { 
                    gravityStrength : 0.03
                }
            },
            block : {
                rendered : {
                    x : 0, 
                    y : 0, 
                    z : 0, 
                    width: 20, 
                    height: 5, 
                    depth: 20, 
                },
                collideable : {
                    width: 20, 
                    height: 5, 
                    depth: 20, 
                }
            }
        })
    })

    socketio.listen( 3001 )
    console.log('Setup socketio')
}
