import type { CoursePart } from '../types'

interface PartProps {
  part: CoursePart
}

// exhaustive check helper
const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <strong>{part.name}</strong> {part.exerciseCount}
          <br />
          <em>{part.description}</em>
        </div>
      )

    case 'group':
      return (
        <div>
          <strong>{part.name}</strong> {part.exerciseCount}
          <br />
          group projects {part.groupProjectCount}
        </div>
      )

    case 'background':
      return (
        <div>
          <strong>{part.name}</strong> {part.exerciseCount}
          <br />
          <em>{part.description}</em>
          <br />
          submit to {part.backgroundMaterial}
        </div>
      )
    case 'special':
      return (
        <div>
          <strong>{part.name}</strong> {part.exerciseCount}
          <br />
          <em>{part.description}</em>
          <br />
          required skills: {part.requirements.join(', ')}
        </div>
      )

    default:
      return assertNever(part)
  }
}

export default Part
