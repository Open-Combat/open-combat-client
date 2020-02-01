import { recieveSyncData } from '../entities/entityManager.js'

let socket = io('http://localhost:3001');

socket.on('connect', () => console.log('Established Server Connection'))

socket.on('recieveSync', recieveSyncData )