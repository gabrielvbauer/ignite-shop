import { styled } from "@stitches/react";
import * as Dialog from "@radix-ui/react-dialog";

export const DialogContent = styled(Dialog.Content, {
  minWidth: 480,
  position: 'absolute',
  top: 0,
  right: 0,
  height: '100vh',
  backgroundColor: '$gray800',
  zIndex: '999',

  padding: 48,
  display: 'flex',
  flexDirection: 'column',

  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',

  footer: {
    div: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      span: {
        color: '$gray100',
        lineHeight: 1.6
      }
    },

    button: {
      width: '100%',
      marginTop: 55,
      backgroundColor: '$green500',
      border: 0,
      color: '$white',
      borderRadius: 8,
      padding: '1.25rem',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '$md',
      transition: 'backgroundColor, .2s',

      '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed'
      },

      '&:not(:disabled):hover': {
        backgroundColor: '$green300'
      }
    }
  }
})

export const Quantity = styled('div', {
  'span:nth-child(2)': {
    fontSize: '$md'
  }
})

export const Total = styled('div', {
  span: {
    fontWeight: 'bold',
    fontSize: '$md',

    '&:nth-child(2)': {
      fontSize: '$xl',
      lineHeight: 1.4
    }
  }
})

export const DialogClose = styled(Dialog.Close, {
  position: 'absolute',
  right: 24,
  top: 24,
  backgroundColor: 'transparent',
  border: 'none',
  color: '$gray500',
  cursor: 'pointer'
})

export const DialogTitle = styled(Dialog.Title, {
  fontSize: '$lg',
  fontWeight: 'bold',
  color: '$gray100',
  lineHeight: '1.6',
  marginTop: 24,
  marginBottom: 32,
})

export const BagItemContainer = styled('div', {
  display: 'flex',
  alignItems: 'stretch',
  flex: 1,
  flexDirection: 'column',
  gap: 24,
})

export const ImageContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',

  img: {
    objectFit: 'cover'
  }
})

export const BagItem = styled('div', {
  display: 'flex',
  alignItems: 'stretch',
  gap: '1.25rem',
  minWidth: 280,

  h3: {
    fontSize: '$md',
    fontWeight: 'normal',
    color: '$gray300',
    lineHeight: '160%',
  },

  span: {
    fontSize: '$md',
    fontWeight: 'bold',
    color: '$gray100',
    lineHeight: '160%',
    display: 'block',
    marginTop: 2,
  },

  a: {
    lineHeight: '160%',
    fontWeight: 'bold',
    color: '$green500',
    marginTop: 8,
    display: 'inline-block',
    cursor: 'pointer',
  }
})