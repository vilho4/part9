import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Diagnosis, Patient, Entry } from '../types'

import AddEntryForm from '../components/PatientPage/AddEntryForm'
import EntryDetails from '../components/EntryDetails'
import patientService from '../services/patients'

const PatientPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const { id } = useParams<{ id: string }>()
  const [patient, setPatient] = useState<Patient | null>(null)

  useEffect(() => {
    if (!id) return
    patientService.getById(id).then(setPatient)
  }, [id])

  if (!patient) {
    return <div>No patient found</div>
  }

  const handleEntryAdded = (entry: Entry) => {
    setPatient({
      ...patient,
      entries: patient.entries.concat(entry),
    })
  }

  return (
    <div>
      <h2>{patient.name}</h2>

      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

      <AddEntryForm patientId={patient.id} diagnoses={diagnoses} onEntryAdded={handleEntryAdded} />

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
