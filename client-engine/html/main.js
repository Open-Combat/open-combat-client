import { ClientECSEngine } from './engine/ClientECS.js'

let gameEngine = new ClientECSEngine ( 60 ) ;
gameEngine.startGameLoop ( )