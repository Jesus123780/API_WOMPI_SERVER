/* eslint-disable @typescript-eslint/no-misused-promises */
'use strict'
import express from 'express'
import {
  LogDanger,
  LogInfo,
  LogSuccess,
  LogWarning
} from '../../utils/magic'
import { createUserRider, getAllUserRider } from '../../domain/userRider'

console.log('[[ USERS ]]')
LogInfo('[GET] = /users/')
LogInfo('[GET] = /users/:id')
LogSuccess('[POST] = /users/')
LogWarning('[PATCH] = /users/:id')
LogDanger('[DELETE] = /users/:id')

const router = express.Router()

router.get('/users/', getAllUserRider)
router.get('/user/:id', getAllUserRider)
router.post('/user/', createUserRider)

export default router
