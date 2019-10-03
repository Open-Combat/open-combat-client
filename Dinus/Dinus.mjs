/* ============================================================ */
/* ===================== Dinus Main File ====================== */
/* ============================================================ */


/* ======================= Game Imports ======================= */

// Manages the scenes and rendering 
import { GameScene } from './rendering/GameSceneManager.js'
import { FrameUpdateManager } from './rendering/FrameUpdateManger.js'

// Manages the standard objects and interactions
import * as StandardObjects from './components/_standardObjects.js'

// Manages the inputs and events
import { InputManager } from './inputs/Inputs.js'


/* ======================== Init Game ========================= */

// Scene
let gameScene = new GameScene()
let plane = new StandardObjects.Plane( gameScene )
let player = new StandardObjects.FirstPersonCamera( gameScene )

// Inputs
let playerInputs = new InputManager()

//Rendering
let frameUpdateManager = new FrameUpdateManager()

/* ======================== Game Loop ========================= */

// Game loop defined, then called by frame update manager every frame
let game_loop = time_delta => {

    // Update objects in scene 
    gameScene.update( playerInputs, time_delta )

    // Render frame
    gameScene.render( player )  
    
    // Called to reset input after frames
    playerInputs.newFrame()  

}

frameUpdateManager.startGameLoop( game_loop )
