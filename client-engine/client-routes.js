import express from 'express'

export const router = express.Router();

router.use( '/', express.static('./client-engine/html') )