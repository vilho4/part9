import patients from '../data/patients'
import { Patient, NewPatient, NewEntry, Entry } from '../types'

import { v1 as uuid } from 'uuid'

const getNonSensitivePatients = () => {
  return patients.map(({ ssn, ...rest }) => rest)
}

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id)
}

const addPatient = (entry: NewPatient): Patient => {
  // Keep property order consistent with the Patient type for readability.
  const newPatient: Patient = {
    id: uuid(),
    name: entry.name,
    dateOfBirth: entry.dateOfBirth,
    ssn: entry.ssn,
    gender: entry.gender,
    occupation: entry.occupation,
    entries: [],
  }

  patients.push(newPatient)
  return newPatient
}

// Add a new entry to an existing patient
const addEntry = (id: string, entry: NewEntry): Entry => {
  const patient = patients.find((p) => p.id === id)
  if (!patient) {
    throw new Error('Patient not found')
  }

  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  }

  patient.entries.push(newEntry)
  return newEntry
}

export default {
  getNonSensitivePatients,
  getPatientById,
  addPatient,
  addEntry,
}
