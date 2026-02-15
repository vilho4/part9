import { HospitalEntry, Diagnosis } from '../../types'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'

interface Props {
  entry: HospitalEntry
  diagnoses: Diagnosis[]
}

const HospitalEntryDetails = ({ entry, diagnoses }: Props) => {
  const getDiagnosisName = (code: string) => diagnoses.find((d) => d.code === code)?.name

  return (
    <div style={{ border: '1px solid #ccc', padding: '1em', marginBottom: '1em' }}>
      <div>
        <strong>{entry.date}</strong> <LocalHospitalIcon />
      </div>

      <div style={{ fontStyle: 'italic', marginTop: '0.5em' }}>{entry.description}</div>

      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>
              <b>{code}</b> {getDiagnosisName(code)}
            </li>
          ))}
        </ul>
      )}

      {entry.discharge && (
        <div style={{ marginTop: '0.5em' }}>
          Discharged: {entry.discharge.date} – {entry.discharge.criteria}
        </div>
      )}

      <div style={{ marginTop: '0.5em' }}>Diagnosed by: {entry.specialist}</div>
    </div>
  )
}

export default HospitalEntryDetails
