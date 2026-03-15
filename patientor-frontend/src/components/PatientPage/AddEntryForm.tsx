import { useState } from 'react'
import axios from 'axios'
import { Entry, Diagnosis } from '../../types'
import { Select, MenuItem, Button, TextField } from '@mui/material'
import patientService from '../../services/patients'

interface Props {
  patientId: string
  diagnoses: Diagnosis[]
  onEntryAdded: (entry: Entry) => void
}

type EntryType = 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'

const AddEntryForm = ({ patientId, diagnoses, onEntryAdded }: Props) => {
  const today = new Date().toISOString().split('T')[0]
  const [type, setType] = useState<EntryType>('HealthCheck')

  const [description, setDescription] = useState('')
  const [date, setDate] = useState(today)
  const [specialist, setSpecialist] = useState('')

  const [healthCheckRating, setHealthCheckRating] = useState(0)

  const [dischargeDate, setDischargeDate] = useState('')
  const [dischargeCriteria, setDischargeCriteria] = useState('')

  const [employerName, setEmployerName] = useState('')
  const [sickLeaveStart, setSickLeaveStart] = useState('')
  const [sickLeaveEnd, setSickLeaveEnd] = useState('')

  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])

  const [error, setError] = useState<string | null>(null)

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      let newEntry

      switch (type) {
        case 'HealthCheck':
          newEntry = {
            type,
            description,
            date,
            specialist,
            healthCheckRating,
            diagnosisCodes,
          }
          break

        case 'Hospital':
          newEntry = {
            type,
            description,
            date,
            specialist,
            diagnosisCodes,
            discharge: {
              date: dischargeDate,
              criteria: dischargeCriteria,
            },
          }
          break

        case 'OccupationalHealthcare':
          newEntry = {
            type,
            description,
            date,
            specialist,
            diagnosisCodes,
            employerName,
            sickLeave:
              sickLeaveStart && sickLeaveEnd
                ? {
                    startDate: sickLeaveStart,
                    endDate: sickLeaveEnd,
                  }
                : undefined,
          }
          break
      }

      const data = await patientService.addEntry(patientId, newEntry)

      onEntryAdded(data)

      setDescription('')
      setDate('')
      setSpecialist('')
      setHealthCheckRating(0)
      setDischargeDate('')
      setDischargeCriteria('')
      setEmployerName('')
      setSickLeaveStart('')
      setSickLeaveEnd('')
      setDiagnosisCodes([])
      setError(null)
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data || 'Unknown error')
      } else {
        setError('Unknown error')
      }
    }
  }

  return (
    <div>
      <h3>Add new entry</h3>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <form onSubmit={submit}>
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          type="date"
          label="Date"
          fullWidth
          margin="normal"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Specialist"
          fullWidth
          margin="normal"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />

        <div style={{ marginTop: 15 }}>
          Type:
          <Select
            value={type}
            onChange={(e) => setType(e.target.value as EntryType)}
            style={{ marginLeft: 15 }}
          >
            <MenuItem value="HealthCheck">HealthCheck</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
          </Select>
        </div>

        <div style={{ marginTop: 15 }}>
          Diagnosis codes:
          <Select
            multiple
            value={diagnosisCodes}
            onChange={(e) =>
              setDiagnosisCodes(
                typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value
              )
            }
            style={{ marginLeft: 15, minWidth: 200 }}
          >
            {diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code} {d.name}
              </MenuItem>
            ))}
          </Select>
        </div>

        {type === 'HealthCheck' && (
          <div style={{ marginTop: 15 }}>
            Health rating:
            <Select
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(Number(e.target.value))}
              style={{ marginLeft: 15 }}
            >
              <MenuItem value={0}>Healthy</MenuItem>
              <MenuItem value={1}>Low risk</MenuItem>
              <MenuItem value={2}>High risk</MenuItem>
              <MenuItem value={3}>Critical risk</MenuItem>
            </Select>
          </div>
        )}

        {type === 'Hospital' && (
          <>
            <TextField
              type="date"
              label="Discharge date"
              fullWidth
              margin="normal"
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Discharge criteria"
              fullWidth
              margin="normal"
              value={dischargeCriteria}
              onChange={(e) => setDischargeCriteria(e.target.value)}
            />
          </>
        )}

        {type === 'OccupationalHealthcare' && (
          <>
            <TextField
              label="Employer name"
              fullWidth
              margin="normal"
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
            />

            <TextField
              type="date"
              label="Sick leave start"
              fullWidth
              margin="normal"
              value={sickLeaveStart}
              onChange={(e) => setSickLeaveStart(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              type="date"
              label="Sick leave end"
              fullWidth
              margin="normal"
              value={sickLeaveEnd}
              onChange={(e) => setSickLeaveEnd(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </>
        )}

        <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>
          Add
        </Button>
      </form>
    </div>
  )
}

export default AddEntryForm
