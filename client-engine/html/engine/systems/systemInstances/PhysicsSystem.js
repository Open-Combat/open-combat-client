import { SortSweepCollider } from './physicsUtils/sortSweepCollider.js'

// Collision implementation

let CollisionManger = new SortSweepCollider( 3 )

// Requires entity that has a position and a hitbox

export function registerCollider ( entity ) {

    let position = entity.position
    let hitbox = entity.hitbox

    let id = CollisionManger.insertBlock( 
        position.x - hitbox.w, position.y - hitbox.h, position.z - hitbox.d ,
        position.x + hitbox.w, position.y + hitbox.h, position.z + hitbox.d 
    )

    return id;

}


// System Properties 

export const target = 'canMove';
export function process ( entity ){
    
    let movement = entity.deltaMovement
    let position = entity.position
    let velocity = entity.velocity

    // Do gravity and velocity changes

    if ( entity.gravity != undefined )
        velocity.y -= entity.gravity.strength;
    movement.add( velocity )


    // Cant hit anything, just move it then
    if ( entity.collideable == undefined){
        position.x += movement.x;
        position.y += movement.y;
        position.z += movement.z;
    }

    // Check for collision on each axis 
    else {

        let collider = entity.collideable.id
        
        let canMove;
        if ( movement.x != 0 ){
            canMove = CollisionManger.checkAndDoMovement( collider, 0, movement.x );
            position.x += canMove
            if ( canMove != movement.x ) velocity.x = 0;
        }
        if ( movement.y != 0 ){
            canMove = CollisionManger.checkAndDoMovement( collider, 1, movement.y );
            position.y += canMove
            if ( canMove != movement.y ) velocity.y = 0;
        }
        if ( movement.z != 0 ) {
            canMove = CollisionManger.checkAndDoMovement( collider, 2, movement.z );
            position.z += canMove
            if ( canMove != movement.z ) velocity.z = 0;
        }

    }
    
    // Reset frame movement
    movement.x = 0;
    movement.y = 0;
    movement.z = 0;

} 
