export const calculateBmi = (heightCm: number, weightKg: number): string => {
  const heightM = heightCm / 100
  const bmi = weightKg / (heightM * heightM)

  if (bmi < 18.5) {
    return 'Underweight'
  } else if (bmi < 25) {
    return 'Normal range'
  } else if (bmi < 30) {
    return 'Overweight'
  } else {
    return 'Obese'
  }
}

// CLI functionality
if (require.main === module) {
  const height = Number(process.argv[2])
  const weight = Number(process.argv[3])

  // Validate inputs
  if (isNaN(height) || isNaN(weight)) {
    console.log('Malformatted parameters')
  } else {
    console.log(calculateBmi(height, weight))
  }
}
