import express from 'express'
import patientService from '../services/patientService'
import { toNewPatient, toNewEntry } from '../utils/patientParser'

const router = express.Router()

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatients())
})

// Get patient by ID, including sensitive information
router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id)
  if (patient) {
    res.json(patient)
  } else {
    res.status(404).send('Patient not found')
  }
})

// Add a new patient
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

// Add a new entry to a patient
router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body)
    const addedEntry = patientService.addEntry(req.params.id, newEntry)
    res.json(addedEntry)
  } catch (e: unknown) {
    let errorMessage = 'Something went wrong.'
    if (e instanceof Error) {
      errorMessage += ' Error: ' + e.message
    }
    res.status(400).send(errorMessage)
  }
})

export default router
