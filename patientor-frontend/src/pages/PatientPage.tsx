import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Diagnosis, Patient } from '../types'

import patientService from '../services/patients'

import EntryDetails from '../components/EntryDetails'

const PatientPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const { id } = useParams<{ id: string }>()
  const [patient, setPatient] = useState<Patient | null>(null)

  useEffect(() => {
    if (!id) return

    patientService.getById(id).then(setPatient)
  }, [id])

  if (!patient) {
    return <div>no patient found</div>
  }

  return (
    <div>
      <h2>{patient.name}</h2>

      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>Entries</h3>

      {patient.entries.length === 0 ? (
        <div>No entries yet.</div>
      ) : (
        patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))
      )}
    </div>
  )
}

export default PatientPage
