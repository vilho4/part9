import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Diagnosis, Patient } from '../types'

import patientService from '../services/patients'

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

  const getDiagnosisName = (code: string): string | undefined => {
    return diagnoses.find((d) => d.code === code)?.name
  }

  return (
    <div>
      <h2>{patient.name}</h2>

      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>Entries</h3>

      <ul style={{ paddingLeft: '1.2em' }}>
        {patient.entries.map((e) => (
          <li key={e.id} style={{ marginBottom: '0.75em' }}>
            <div>
              <strong>{e.date}</strong>
            </div>

            <div>{e.description}</div>

            {e.diagnosisCodes && (
              <ul style={{ paddingLeft: '1.2em', marginTop: '0.25em' }}>
                {e.diagnosisCodes.map((code) => (
                  <li key={code}>
                    <b>{code}</b> {getDiagnosisName(code)}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <br />
    </div>
  )
}

export default PatientPage
