import { newPatientSchema, patientSchema, newEntrySchema } from './patientSchema'
import { NewPatient, Patient, NewEntry } from '../types'

export const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object)
}

export const toPatient = (object: unknown): Patient => {
  return patientSchema.parse(object)
}

export const toNewEntry = (object: unknown): NewEntry => {
  return newEntrySchema.parse(object)
}

// zod replacement for the below manual parsing and validation
// const isString = (text: unknown): text is string => {
//   return typeof text === 'string' || text instanceof String
// }

// const parseString = (value: unknown): string => {
//   if (!isString(value)) {
//     throw new Error('Invalid or missing string')
//   }
//   return value
// }

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date))
// }

// const parseDate = (date: unknown): string => {
//   if (!isString(date) || !isDate(date)) {
//     throw new Error('Invalid or missing date')
//   }
//   return date
// }

// const isGender = (param: unknown): param is Gender => {
//   return Object.values(Gender).includes(param as Gender)
// }

// const parseGender = (gender: unknown): Gender => {
//   if (!isGender(gender)) {
//     throw new Error('Invalid or missing gender')
//   }
//   return gender
// }

//  export const toNewPatient = (object: unknown): NewPatient => {
//    if (!object || typeof object !== 'object') {
//      throw new Error('Invalid patient data: expected an object')

//    if (!('name' in object)) {
//      throw new Error('Missing field: name')
//    }
//    if (!('dateOfBirth' in object)) {
//      throw new Error('Missing field: dateOfBirth')
//    }
//    if (!('ssn' in object)) {
//      throw new Error('Missing field: ssn')
//    }
//    if (!('gender' in object)) {
//      throw new Error('Missing field: gender')
//    }
//    if (!('occupation' in object)) {
//      throw new Error('Missing field: occupation')

//    return {
//      name: parseString(object.name),
//      dateOfBirth: parseDate(object.dateOfBirth),
//      ssn: parseString(object.ssn),
//      gender: parseGender(object.gender),
//      occupation: parseString(object.occupation),
//    }
//  }

// export const toPatient = (object: unknown): Patient => {
//   if (!object || typeof object !== 'object') {
//     throw new Error('Invalid patient data: expected an object')
//   }

//   if (!('id' in object)) {
//     throw new Error('Missing field: id')
//   }
//   if (!('name' in object)) {
//     throw new Error('Missing field: name')
//   }
//   if (!('dateOfBirth' in object)) {
//     throw new Error('Missing field: dateOfBirth')
//   }
//   if (!('ssn' in object)) {
//     throw new Error('Missing field: ssn')
//   }
//   if (!('gender' in object)) {
//     throw new Error('Missing field: gender')
//   }
//   if (!('occupation' in object)) {
//     throw new Error('Missing field: occupation')
//   }

//   return {
//     id: parseString(object.id),
//     name: parseString(object.name),
//     dateOfBirth: parseDate(object.dateOfBirth),
//     ssn: parseString(object.ssn),
//     gender: parseGender(object.gender),
//     occupation: parseString(object.occupation),
//     entries: [],
//   }
// }
