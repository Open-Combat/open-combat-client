import { files as systems } from './systemInstances/_index.js'
import { getEntitiesWithComponent } from '../components/componentManager.js'

export function updateAllSystems () {

    // Go through each system
    for ( let i = 0 ; i < systems.length; i ++ ) {
        
        // Get entities that system targets
        let matches = getEntitiesWithComponent( systems[i].target );

        // Processes those entities
        matches.forEach( e => systems[i].process( e ) )
    }


}