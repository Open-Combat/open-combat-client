import * as InputManager from '../../utils/inputManager.js'

// Player variables

let dX = 0;
let dY = 0;

let rotationSpeed = 0.002;
let movementSpeed = 0.3;
let jumpPower = 0.4;


function onMouseMove (event) {

    var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    dX -= movementX * rotationSpeed;
    dY -= movementY * rotationSpeed;

}
function onMouseClick (event) {
        
    document.body.requestPointerLock();

}

document.addEventListener( 'mousemove', onMouseMove );
document.addEventListener( 'click', onMouseClick ) ;

// System Calls 

export const target = 'player' ;
export function process ( entity ) {

    // Players have lots of components :/
    let rotation = entity.rotation
    let camera = entity.camera
    let movement = entity.deltaMovement
    let velocity = entity.velocity
    let position = entity.position
    
    // Looking around 
    rotation.yaw.rotation.y += dX
    rotation.pitch.rotation.x += dY

    dX = 0
    dY = 0
    
    // Moving around 

    if ( InputManager.getKeyState( 'w' ) > 0 || InputManager.getKeyState ( 's' ) > 0 ){

        let forward = new THREE.Vector3 (0,0,1)
        let cameraForward = camera.localToWorld( forward ).addScaledVector( position, -1 );
      
        cameraForward.y = 0;
        cameraForward.normalize()
        cameraForward.multiplyScalar( movementSpeed )

        if ( InputManager.getKeyState( 'w' ) > 0 )
            movement.add( cameraForward.multiplyScalar( -1 ) )
        if ( InputManager.getKeyState( 's' ) > 0 )
            movement.add( cameraForward )

    }
    
    if ( InputManager.getKeyState( 'a' ) > 0 || InputManager.getKeyState ( 'd' ) > 0 ){
        let left = new THREE.Vector3 (1,0,0)
        let cameraLeft = camera.localToWorld( left ).addScaledVector( position, -1 );

        cameraLeft.y = 0;
        cameraLeft.normalize()
        cameraLeft.multiplyScalar( movementSpeed )

        if ( InputManager.getKeyState( 'a' ) > 0 )
            movement.add( cameraLeft.multiplyScalar( -1 ) )
        if ( InputManager.getKeyState( 'd' ) > 0 )
            movement.add( cameraLeft )

    }

    if ( InputManager.getKeyState( ' ' ) == 1){
        velocity.add( new THREE.Vector3 ( 0, jumpPower, 0) )
    }

}
