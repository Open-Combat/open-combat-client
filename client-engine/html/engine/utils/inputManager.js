/* Stores user input */

let keyStates = {};
let deltaStates = []

document.body.addEventListener( 'keydown', keyDown )
document.body.addEventListener( 'keyup', keyUp )

function keyDown ( evt ) {
    let key = String.fromCharCode(evt.keyCode).toLowerCase();
    if ( keyStates[ key ] == undefined ) keyStates[ key ] = 0
    deltaStates.key = true;
}
function keyUp ( evt  ) {
    let key = String.fromCharCode(evt.keyCode).toLowerCase();
    delete keyStates[ key ]
    deltaStates.key = false;
}

export function registerKeyboardUpdate ( ){
    let keys = Object.keys(keyStates )
    keys.forEach( key => ++ keyStates[key] )
}

export function getKeyState ( key ) {
    return keyStates[ key ] | 0
}

export function getDeltaKeystates () {
    let returnData = { ... deltaStates }
    keyStates = {};
    return returnData
}

