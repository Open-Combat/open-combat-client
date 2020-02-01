
import fs from 'fs'

function indexDirectory ( directoryPath ) {

    var files = fs.readdirSync( directoryPath );

    var rawOutput = ""
    var fileNames = []

    files.forEach( file => {

        let fullPath = `${directoryPath}/${file}`;
        let stat = fs.statSync(fullPath);
        let ending = file.substr( file.length-3 ) 

        if ( stat.isDirectory() ) {
            indexDirectory( fullPath )
            return;
        }
        if ( file == '_index.js') return;
        if ( ending != '.js' ) return;

        let path = `./${file}`;
        let name = file.split('.')[0]
        
        rawOutput += `import * as ${name} from '${path}'\n`
        fileNames.push( name )
    })

    rawOutput += `export const files = [${fileNames.join(',\n')}];\n`
    rawOutput += `export const fileMap = {`
    fileNames.forEach ( f => rawOutput += `${f} : ${f}, `)
    rawOutput += '};'
    fs.writeFileSync(`${directoryPath}/_index.js`, rawOutput );
}

indexDirectory( './client-engine/html/engine')