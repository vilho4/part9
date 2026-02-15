import { HealthCheckEntry, Diagnosis } from '../../types'
import HealthRatingBar from '../HealthRatingBar'

interface Props {
  entry: HealthCheckEntry
  diagnoses: Diagnosis[]
}

const HealthCheckEntryDetails = ({ entry, diagnoses }: Props) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1em', marginBottom: '1em' }}>
      <div>
        <strong>{entry.date}</strong>
      </div>

      <div style={{ fontStyle: 'italic', marginTop: '0.5em' }}>{entry.description}</div>

      <div style={{ marginTop: '0.5em' }}>
        <HealthRatingBar rating={entry.healthCheckRating} showText />
      </div>

      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => {
            const diagnosis = diagnoses.find((d) => d.code === code)
            return (
              <li key={code}>
                {code} {diagnosis ? diagnosis.name : ''}
              </li>
            )
          })}
        </ul>
      )}

      <div style={{ marginTop: '0.5em' }}>Diagnosed by: {entry.specialist}</div>
    </div>
  )
}

export default HealthCheckEntryDetails
