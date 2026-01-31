import express from 'express'
import diagnoseService from '../services/diagnoseService'

const router = express.Router()

router.get('/', (_req, res) => {
  res.json(diagnoseService.getAll())
})

router.post('/', (_req, res) => {
  res.send('Saving a diagnosis!')
})

export default router
