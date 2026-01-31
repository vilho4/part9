export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
}
// Define NonSensitivePatient type by omitting 'ssn' from Patient
export type NonSensitivePatient = Omit<Patient, 'ssn'>
