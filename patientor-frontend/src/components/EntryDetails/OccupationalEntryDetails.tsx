import { Diagnosis, OccupationalHealthcareEntry } from '../../types'
import WorkIcon from '@mui/icons-material/Work'

interface Props {
  entry: OccupationalHealthcareEntry
  diagnoses: Diagnosis[]
}

const OccupationalEntryDetails = ({ entry, diagnoses }: Props) => {
  const getDiagnosisName = (code: string) => diagnoses.find((d) => d.code === code)?.name

  return (
    <div style={{ border: '1px solid #ccc', padding: '1em', marginBottom: '1em' }}>
      <div>
        <strong>{entry.date}</strong> <WorkIcon />
      </div>

      <div style={{ fontStyle: 'italic', marginTop: '0.5em' }}>{entry.description}</div>

      <div style={{ marginTop: '0.5em' }}>Employer: {entry.employerName}</div>

      {entry.sickLeave && (
        <div>
          Sick leave: {entry.sickLeave.startDate} – {entry.sickLeave.endDate}
        </div>
      )}

      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>
              <b>{code}</b> {getDiagnosisName(code)}
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: '0.5em' }}>Diagnosed by: {entry.specialist}</div>
    </div>
  )
}

export default OccupationalEntryDetails
