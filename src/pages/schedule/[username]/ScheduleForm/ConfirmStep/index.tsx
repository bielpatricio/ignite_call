import { Button, Text, TextArea, TextInput, Toast } from '@biel-ui/react'
import { Container, FormActions, FormHeader, FormError } from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { api } from '../../../../../lib/axios'
import { useRouter } from 'next/router'

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  obs: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  backToCalendar: (openToast?: boolean) => void
}

export function ConfirmStep({
  schedulingDate,
  backToCalendar,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const router = useRouter()
  const username = String(router.query.username)

  async function handleConfirmSchedule(data: ConfirmFormData) {
    const { name, email, obs } = data
    try {
      await api.post(`/users/${username}/schedule`, {
        name,
        email,
        obs,
        date: schedulingDate,
      })

      backToCalendar(true)
    } catch (error) {
      console.error(error)
    }
  }

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <Container as="form" onSubmit={handleSubmit(handleConfirmSchedule)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>

        <Text>
          <Clock />
          {describedTime}
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome Completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="johndoe@example.com"
          {...register('email')}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('obs')} />
      </label>

      <FormActions>
        <Button
          type="button"
          variant="tertiary"
          onClick={() => backToCalendar(false)}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </Container>
  )
}
