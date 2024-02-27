/* eslint-disable @typescript-eslint/no-misused-promises */
'use strict'
import express from 'express'
import {
  LogDanger,
  LogInfo,
  LogSuccess,
  LogWarning
} from '../../utils/magic'
import { getAll } from '../../domain/user'

console.log('[[ transaction ]]')
LogInfo('[GET] = /transaction/')
LogInfo('[GET] = /transaction/:id')
LogSuccess('[POST] = /transaction/')
LogWarning('[PATCH] = /transaction/:id')
LogDanger('[DELETE] = /transaction/:id')

const router = express.Router()

router.get('/transaction/', getAll)
// router.get('/transaction/:id', GetById)
// router.post('/transaction/', Store)
// router.delete('/transaction/:id', DeleteById)
// router.patch('/transaction/:id', UpdateById)

export default router
