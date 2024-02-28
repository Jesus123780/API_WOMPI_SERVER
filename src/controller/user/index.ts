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

console.log('[[ USERS ]]')
LogInfo('[GET] = /users/')
LogInfo('[GET] = /users/:id')
LogSuccess('[POST] = /users/')
LogWarning('[PATCH] = /users/:id')
LogDanger('[DELETE] = /users/:id')

const router = express.Router()

router.get('/users/', getAll)

export default router
