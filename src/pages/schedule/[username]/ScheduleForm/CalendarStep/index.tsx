import { useState, useEffect, useCallback } from 'react'
import { Calendar } from '../../../../../components/Calendar'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'
import dayjs from 'dayjs'
import { api } from '../../../../../lib/axios'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const router = useRouter()
  const username = String(router.query.username)

  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const day_month = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  // const [availability, setAvailability] = useState<Availability | null>(null)
  // const fetchAvailableTime = useCallback(async () => {
  //   if (!selectedDate) {
  //     return
  //   }

  //   try {
  //     const response = await api.get(`users/${username}/availability`, {
  //       params: {
  //         date: dayjs(selectedDate).format('YYYY-MM-DD'),
  //       },
  //     })
  //     setAvailability(response.data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }, [selectedDate, username])

  // useEffect(() => {
  //   fetchAvailableTime()
  // }, [fetchAvailableTime])

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability, isLoading } = useQuery<Availability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      try {
        const response = await api.get(`users/${username}/availability`, {
          params: {
            date: selectedDateWithoutTime,
          },
        })
        return response.data
      } catch (error) {
        console.error(error)
      }
    },
    {
      enabled: !!selectedDate,
    },
  )

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{day_month}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes?.map((hour) => {
              return (
                <TimePickerItem
                  key={hour}
                  disabled={!availability.availableTimes.includes(hour)}
                >
                  {String(hour).padStart(2, '0')}:00h
                </TimePickerItem>
              )
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
