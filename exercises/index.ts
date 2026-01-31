import express from 'express'
const app = express()

import { calculateBmi } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator'

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('<h1>Hello Full Stack!</h1>')
})

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  // Validate query parameters
  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).json({
      error: 'malformatted parameters',
    })
    return
  }

  // Calculate BMI
  const bmi = calculateBmi(height, weight)

  res.json({
    height,
    weight,
    bmi,
  })
})

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body

  // Check for missing parameters
  if (!daily_exercises || !target) {
    res.status(400).json({
      error: 'parameters missing',
    })
    return
  }

  // Validate parameter types
  if (
    !Array.isArray(daily_exercises) ||
    isNaN(Number(target)) ||
    !daily_exercises.every((hour) => !isNaN(Number(hour)))
  ) {
    res.status(400).json({
      error: 'malformatted parameters',
    })
    return
  }

  // Calculate exercise results
  const result = calculateExercises(
    daily_exercises.map((hour) => Number(hour)),
    Number(target)
  )

  res.json(result)
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
