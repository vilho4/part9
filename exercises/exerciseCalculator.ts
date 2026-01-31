export interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

export const calculateExercises = (dailyExercises: number[], target: number): Result => {
  const periodLength = dailyExercises.length
  const trainingDays = dailyExercises.filter((day) => day > 0).length
  const totalHours = dailyExercises.reduce((sum, hours) => sum + hours, 0)
  const average = totalHours / periodLength
  const success = average >= target

  let rating: number
  let ratingDescription: string

  if (average < target * 0.5) {
    rating = 1
    ratingDescription = 'More practice for you'
  } else if (average < target) {
    rating = 2
    ratingDescription = 'Could be better'
  } else {
    rating = 3
    ratingDescription = 'Well done!'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

// CLI functionality
if (require.main === module) {
  const args = process.argv.slice(2)

  // Check for sufficient arguments
  if (args.length < 2) {
    console.log('Not enough arguments')
  } else {
    const target = Number(args[0])
    const dailyExercises = args.slice(1).map((arg) => Number(arg))

    // Validate inputs
    if (isNaN(target) || dailyExercises.some((hour) => isNaN(hour))) {
      console.log('Malformatted parameters')
    } else {
      console.log(calculateExercises(dailyExercises, target))
    }
  }
}
