import patients from '../data/patients'
import { Patient } from '../types'
import { v1 as uuid } from 'uuid'

const getNonSensitivePatients = () => {
  return patients.map(({ ssn, ...rest }) => rest)
}

// patient parameter omits 'id' because it will be generated
const addPatient = (patient: Omit<Patient, 'id'>): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  }
  // Add the new patient to the patients array
  patients.push(newPatient)
  return newPatient
}

export default {
  getNonSensitivePatients,
  addPatient,
}
