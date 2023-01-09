import { Box, Heading, Text, styled } from '@biel-ui/react'

export const Container = styled('main', {
  maxWidth: 572,
  margin: '$20 auto $4',
  padding: '0 $4',
})

export const Header = styled('div', {
  padding: '0 $6',

  [`> ${Heading}`]: {
    '@media (max-width: 600px)': {
      lineHeight: '$base',
    },
  },

  [`> ${Text}`]: {
    marginBottom: '$6',
    color: '$gray200',
  },
})

export const Form = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormError = styled(Text, {
  color: '$red500',
})
