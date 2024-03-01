/* eslint-disable @typescript-eslint/no-misused-promises */
'use strict'
import express from 'express'
import {
  LogDanger,
  LogInfo,
  LogSuccess,
  LogWarning
} from '../../utils/magic'
import { createRide } from '../../domain/ride'

console.log('[[ ride ]]')
LogInfo('[GET] = /ride/')
LogInfo('[GET] = /ride/:id')
LogSuccess('[POST] = /createRide/')
LogWarning('[PATCH] = /ride/:id')
LogDanger('[DELETE] = /ride/:id')

const router = express.Router()
// router.get('/ride/', rideRide)
// router.get('/ride/:id', GetById)
router.post('/createRide/', createRide)
// router.delete('/ride/:id', DeleteById)
// router.patch('/ride/:id', UpdateById)

export default router
