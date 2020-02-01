
import { isEmpty } from '../utils/utils.js'
import * as componentManager from '../components/componentManager.js'

let entities = {}

export function recieveSyncData ( data ) {

    let entityIds = Object.keys( data )
    entityIds.forEach( (key) => {

        let componentData = data[key]

        // Create if new 
        if ( ! ( key in entities ) )
            entities[ key ] = {} 

        // Destroy Entity Requested
        if ( isEmpty ( componentData ) )
        {
            let targetEntity = entities[ key ]
            let components = Object.keys( targetEntity )
            components.forEach( c => componentManager.destroyExistingComponent( targetEntity, c ) )
            delete entities[ key ]
        }

        // Adjust entity component data 
        else {

            let targetEntity = entities[ key ]
            let componentChanges = Object.keys( componentData )

            componentChanges.forEach( componentString => {

                let componentChangeData = componentData[ componentString ]

                // New component    
                if ( ! ( componentString in targetEntity ) )
                    componentManager.initializeNewComponent( targetEntity, componentString, componentChangeData )
                
                // Component requests deletion
                else if ( isEmpty ( componentChangeData ))
                    componentManager.destroyExistingComponent( targetEntity, componentString )

                // Data just needs to be adjusted
                else 
                    targetEntity[ componentString ] = { ... targetEntity[ componentString ], ... componentChangeData }



            })

        }


    })

}