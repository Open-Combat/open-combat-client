import { fileMap as components } from './componentInstances/_index.js'

let componentMap = {}

function addEntityComponentPairToMap (entity, componentString) {

    if ( componentMap[ componentString ] == undefined)
        componentMap[ componentString ] = [ entity ]
    else
        componentMap[ componentString ].push( entity )

}

function removeEntityComponentPairFromMap ( entity, componentString ) {
    
    let target = componentMap[ componentString ];
    let newMap = target.filter( e => e != entity )
    if ( newMap.length == 0 ) 
        delete componentMap[ componentString ]
    else    
        componentMap[ componentString ] = newMap

}

export function initializeNewComponent ( entity, componentString, data ) {

    let targetComponent = components[ componentString ]
    let newComponents = targetComponent.constructor ( entity, data )
    newComponents.forEach( c => addEntityComponentPairToMap ( entity, c ))

}

export function destroyExistingComponent ( entity, componentString ) {

    let targetComponent = components[ componentString ]
    let killedComponents = targetComponent.destructor ( entity )
    killedComponents.forEach( c => removeEntityComponentPairFromMap ( entity, c ))

}


export function getEntitiesWithComponent ( componentString ) {
    return componentMap[ componentString ] || []
}
export function getFirstEntityWithComponent ( componentString ) {
    return ( componentMap[ componentString ] || [] ) [ 0 ]
}
