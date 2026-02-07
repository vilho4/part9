import DiaryList from './components/DiaryList'
import { useDiaries } from './hooks/useDiaries'
import DiaryForm from './components/DiaryForm'
import { useEffect, useState } from 'react'

const App = () => {
  const { data, isLoading, isError, error } = useDiaries()
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        setShowError(true)
      }, 5000)

      return () => clearTimeout(timer)
    }

    setShowError(false)
  }, [isError])

  if (isLoading) {
    return <div>Loading diaries...</div>
  }

  if (isError && showError) {
    return <div style={{ color: 'red' }}>{error.message}</div>
  }

  return (
    <div>
      <DiaryForm />
      <h1>Flight Diaries</h1>
      <DiaryList diaries={data ?? []} />
    </div>
  )
}

export default App
