import type { DiaryEntry } from '../types'

interface DiaryItemProps {
  diary: DiaryEntry
}

const DiaryItem = ({ diary }: DiaryItemProps) => {
  return (
    <div style={{ marginBottom: '1em' }}>
      <strong>{diary.date}</strong>
      <div>Weather: {diary.weather}</div>
      <div>Visibility: {diary.visibility}</div>
      <div>Comment: {diary.comment}</div>
    </div>
  )
}

export default DiaryItem
