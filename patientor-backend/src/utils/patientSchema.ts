import { z } from 'zod'
import { Gender } from '../types'

const genderValues = Object.values(Gender) as [Gender, ...Gender[]]

export const newPatientSchema = z.object({
  name: z.string().min(1), // at least 1 character
  dateOfBirth: z
    .string()
    // must be in YYYY-MM-DD format
    .refine((date) => /^\d{4}-\d{2}-\d{2}$/.test(date) && !isNaN(Date.parse(date)), {
      message: 'Invalid date format, expected YYYY-MM-DD',
    }),
  ssn: z.string().min(1), // at least 1 character
  gender: z.enum(genderValues), // must be one of the Gender enum values
  occupation: z.string().min(1), // at least 1 character
})

export const patientSchema = newPatientSchema.extend({
  id: z.string().min(1),
  entries: z.array(z.any()),
})
