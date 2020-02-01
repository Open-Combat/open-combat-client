/* 

      ____                      _____                _           _   
     / __ \                    / ____|              | |         | |  
    | |  | |_ __   ___ _ __   | |     ___  _ __ ___ | |__   __ _| |_ 
    | |  | | '_ \ / _ | '_ \  | |    / _ \| '_ ` _ \| '_ \ / _` | __|
    | |__| | |_) |  __| | | | | |___| (_) | | | | | | |_) | (_| | |_ 
     \____/| .__/ \___|_| |_|  \_____\___/|_| |_| |_|_.__/ \__,_|\__|
           | |                                                       
           |_|                                                       

    Created by Eric Robertson
    Github : https://github.com/eric-robertson

    This is the engine for the game

*/


import express from 'express'
import * as http from 'http'
import socketIO from 'socket.io'

import { router as clientRouting } from './client-engine/client-routes.js' 
import { registerSocketIO } from './server-engine/server-socket.js' 

let application = express ();
let port = 3000;

let server = http.createServer( application )
let io = socketIO.listen( server );
registerSocketIO( io )

application.use( express.json() );
application.use( express.urlencoded() );

application.use( '/c', clientRouting )

application.listen( port, () => console.log(`Started up on ${port}!`))
