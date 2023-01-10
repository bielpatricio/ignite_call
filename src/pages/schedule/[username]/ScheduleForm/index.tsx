import { useState } from 'react'
import { CalendarStep } from './CalendarStep'
import { ConfirmStep } from './ConfirmStep'
import dayjs from 'dayjs'
import { Container } from '../styles'
import { Toast } from '@biel-ui/react'

export function ScheduleForm() {
  const [selectDateTime, setSelectDateTime] = useState<Date | null>()
  const [open, setOpen] = useState(false)
  const [timeScheduled, setTimeScheduled] = useState<Date | null>()

  console.log('entrou', timeScheduled)
  function handleClearSelectDateTime(openToast?: boolean) {
    if (openToast) {
      setOpen(true)
      setTimeScheduled(selectDateTime)
    }
    setSelectDateTime(null)
  }

  if (selectDateTime) {
    console.log('entrou selectDateTime', open)
    return (
      <ConfirmStep
        schedulingDate={selectDateTime}
        backToCalendar={handleClearSelectDateTime}
      />
    )
  }

  return (
    <Container>
      <CalendarStep onSelectDateTime={setSelectDateTime} />
      {open && (
        <Toast
          title="Agendamento realizado"
          dateDescription={timeScheduled ?? dayjs().toDate()}
          openToast={open}
        />
      )}
    </Container>
  )
}
