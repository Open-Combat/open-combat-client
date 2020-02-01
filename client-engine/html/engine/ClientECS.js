/* 
    Controller of the client side of the game engine itself
*/

import * as inputManager from './utils/inputManager.js'
import * as serverConnectionManager from './serverConnection/serverConnectionManager.js'
import * as systemManager from './systems/systemManager.js'

export class ClientECSEngine {

    gameloop ;

    constructor ( ) { }

    startGameLoop ( targetFrameRate = 60 ) {
            
        let updateSpeed = 1000 / targetFrameRate
        
        this.gameLoop = setInterval( () => {

            inputManager.registerKeyboardUpdate()
            systemManager.updateAllSystems()
        
        }, updateSpeed)
    }

    stopGameLoop () {

        clearInterval( gameLoop )

    }

}
