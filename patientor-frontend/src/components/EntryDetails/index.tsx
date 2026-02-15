import { Entry, Diagnosis } from '../../types'
import { assertNever } from '../../utils'

import HospitalEntryDetails from './HospitalEntryDetails'
import OccupationalEntryDetails from './OccupationalEntryDetails'
import HealthCheckEntryDetails from './HealthCheckEntryDetails'

interface Props {
  entry: Entry
  diagnoses: Diagnosis[]
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
  console.log('EntryDetails', entry)
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />

    case 'OccupationalHealthcare':
      return <OccupationalEntryDetails entry={entry} diagnoses={diagnoses} />

    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />

    default:
      return assertNever(entry)
  }
}

export default EntryDetails
