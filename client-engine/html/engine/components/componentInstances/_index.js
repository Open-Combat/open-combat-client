import * as camera from './camera.js'
import * as canMove from './canMove.js'
import * as collideable from './collideable.js'
import * as gravity from './gravity.js'
import * as player from './player.js'
import * as rendered from './rendered.js'
export const files = [camera,
canMove,
collideable,
gravity,
player,
rendered];
export const fileMap = {camera : camera, canMove : canMove, collideable : collideable, gravity : gravity, player : player, rendered : rendered, };