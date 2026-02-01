import patients from '../data/patients'
import { Patient, NewPatient } from '../types'

import { v1 as uuid } from 'uuid'

const getNonSensitivePatients = () => {
  return patients.map(({ ssn, ...rest }) => rest)
}

const addPatient = (entry: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    entries: [],
    ...entry,
  }

  patients.push(newPatient)
  return newPatient
}

export default {
  getNonSensitivePatients,
  addPatient,
}
