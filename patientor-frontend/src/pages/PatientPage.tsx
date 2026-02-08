import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Patient } from '../types'

import patientService from '../services/patients'

const PatientPage = () => {
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
      <ul>
        {patient.entries.map((e) => (
          <li key={e.id}>{e.type}</li>
        ))}
      </ul>

      <br />
    </div>
  )
}

export default PatientPage
