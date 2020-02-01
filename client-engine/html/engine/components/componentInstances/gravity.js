
export const implementedComponents = [ 'gravity' ];

export function constructor ( entity, data ) {

    entity.gravity = { 
        strength: data.gravityStrength
    }

}
