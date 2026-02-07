import axios, { AxiosError } from 'axios'
import type { DiaryEntry, NewDiary } from '../types'
const apiBaseUrl = 'http://localhost:3000/api/'

export const getAllDiaries = async (): Promise<DiaryEntry[]> => {
  try {
    const response = await fetch(`${apiBaseUrl}diaries`)

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    const data: unknown = await response.json()
    return data as DiaryEntry[]
  } catch (error) {
    console.error('Error fetching diaries:', error)
    throw new Error('Could not fetch diaries from server')
  }
}

export const createDiary = async (newDiary: NewDiary): Promise<DiaryEntry> => {
  try {
    console.log('Creating diary with data:', newDiary)
    const response = await axios.post<DiaryEntry>(`${apiBaseUrl}diaries`, newDiary)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<string>

      if (axiosError.response?.data) {
        throw new Error(axiosError.response.data)
      }
    }

    throw new Error('Failed to create diary')
  }
}
