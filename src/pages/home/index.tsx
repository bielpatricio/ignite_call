import { Heading, Text } from '@biel-ui/react'
import Image from 'next/image'
import previewImage from '../../assets/app_preview.png'
import { Hero, HomeContainer, Preview } from './styles'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'

export default function Home() {
  return (
    <HomeContainer>
      <Hero>
        <Heading as="h1" size="4xl">
          Agendamento descomplicado
        </Heading>
        <Text size="lg">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>

        <ClaimUsernameForm />
      </Hero>

      <Preview>
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt="Calendário do app"
        />
      </Preview>
    </HomeContainer>
  )
}
