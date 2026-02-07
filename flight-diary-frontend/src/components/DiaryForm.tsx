import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createDiary } from '../services/diaryService'
import type { Weather, Visibility } from '../types'
import RadioGroup from './RadioGroup'

const DiaryForm = () => {
  const queryClient = useQueryClient()

  const [date, setDate] = useState('')
  const [weather, setWeather] = useState<Weather>('sunny')
  const [visibility, setVisibility] = useState<Visibility>('great')
  const [comment, setComment] = useState('')

  const [error, setError] = useState<string | null>(null)
  const [showError, setShowError] = useState(false)

  const mutation = useMutation({
    mutationFn: createDiary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diaries'] })
      setDate('')
      setComment('')
    },
    onError: (err: Error) => {
      setError(err.message)
    },
  })

  useEffect(() => {
    if (!error) return

    setShowError(true)

    const timer = setTimeout(() => {
      setShowError(false)
      setError(null)
    }, 5000)

    return () => clearTimeout(timer)
  }, [error])

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    mutation.mutate({ date, weather, visibility, comment })
  }

  return (
    <div>
      <h2>Add new diary</h2>

      {error && showError && <div style={{ color: 'red' }}>{error}</div>}

      <form onSubmit={submit}>
        <div>
          date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <RadioGroup
          label="weather"
          name="weather"
          options={['sunny', 'rainy', 'cloudy', 'stormy', 'windy']}
          value={weather}
          onChange={setWeather}
        />

        <RadioGroup
          label="visibility"
          name="visibility"
          options={['great', 'good', 'ok', 'poor']}
          value={visibility}
          onChange={setVisibility}
        />
        <div>
          comment
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>

        <button type="submit" disabled={mutation.isPending}>
          add
        </button>
      </form>
    </div>
  )
}

export default DiaryForm
