import { useQuery } from '@tanstack/react-query'
import type { DiaryEntry } from '../types'
import { getAllDiaries } from '../services/diaryService'

export const useDiaries = () => {
  return useQuery<DiaryEntry[], Error>({
    queryKey: ['diaries'],
    queryFn: getAllDiaries,
    retry: 3,
    retryDelay: 1000,
  })
}
