/* eslint-disable @typescript-eslint/no-misused-promises */
'use strict'
import express from 'express'
import {
  LogDanger,
  LogInfo,
  LogSuccess,
  LogWarning
} from '../../utils/magic'
import { createDriver } from '../../domain/driver'

console.log('[[ driver ]]')
LogInfo('[GET] = /driver/')
LogInfo('[GET] = /driver/:id')
LogSuccess('[POST] = /driver/')
LogWarning('[PATCH] = /driver/:id')
LogDanger('[DELETE] = /driver/:id')

const router = express.Router()
// router.get('/driver/', driver)
// router.get('/driver/:id', GetById)
router.post('/driver/', createDriver)
// router.delete('/driver/:id', DeleteById)
// router.patch('/driver/:id', UpdateById)

export default router
