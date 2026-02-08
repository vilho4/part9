export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
}

export interface Diagnosis {
  code: string
  name: string
  latin?: string //optional
}

export interface BaseEntry {
  id: string
  date: string
  specialist: string
  description: string
  diagnosisCodes?: Diagnosis['code'][]
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: {
    // date and criteria for leaving hospital
    date: string
    criteria: string
  }
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string
  sickLeave?: {
    // optional sick leave period
    startDate: string
    endDate: string
  }
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck'
  // describes patient's health status from 0-3 (0 is healthy)
  healthCheckRating: HealthCheckRating
}

// union type for all entry types
export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
  entries: Entry[] // array of entries
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>
export type NewPatient = Omit<Patient, 'id' | 'entries'>
