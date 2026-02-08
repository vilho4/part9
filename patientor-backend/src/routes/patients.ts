import express from 'express'
import patientService from '../services/patientService'
import { toNewPatient } from '../utils/patientParser'

const router = express.Router()

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatients())
})

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id)
  if (patient) {
    res.json(patient)
  } else {
    res.status(404).send('Patient not found')
  }
})

router.post('/', (req, res) => {
  try {
    // parse and validate the incoming data with Zod
    const newPatient = toNewPatient(req.body)
    const savedPatient = patientService.addPatient(newPatient)
    res.json(savedPatient)
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message)
    } else {
      res.status(400).send('Invalid patient data')
    }
  }
})

export default router
