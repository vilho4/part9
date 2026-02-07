import type { DiaryEntry } from '../types'
import DiaryItem from './DiaryItem'

interface DiaryListProps {
  diaries: DiaryEntry[]
}

const DiaryList = ({ diaries }: DiaryListProps) => {
  return (
    <div>
      {diaries.map((diary) => (
        <DiaryItem key={diary.id} diary={diary} />
      ))}
    </div>
  )
}

export default DiaryList
