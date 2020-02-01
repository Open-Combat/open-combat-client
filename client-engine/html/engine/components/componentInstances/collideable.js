import { registerCollider } from '../../systems/systemInstances/PhysicsSystem.js'

export const implementedComponents = [ 'hitbox', 'collideable' ];

export function constructor ( entity, data ) {

    entity.hitbox = { 
        w : data.width / 2, 
        h : data.height / 2, 
        d : data.depth / 2 
    }

    let colliderId = registerCollider ( entity )
    entity.collideable = { id : colliderId }

}

