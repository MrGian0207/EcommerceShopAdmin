import { toast, TypeOptions } from 'react-toastify'

let toastId: any = null

export const showToastMessagePending = () => {
  toastId = toast.loading('Processing...', {
    position: 'top-center',
  })
}

export const showToastMessageSuccessfully = (message: string) => {
  toast.update(toastId, {
    render: `${message}`,
    type: 'success',
    isLoading: false,
    autoClose: 1000,
    position: 'top-center',
  })
}

export const showToastMessageFailure = (message: string) => {
  toast.update(toastId, {
    render: `${message}`,
    type: 'error',
    isLoading: false,
    autoClose: 1000,
    position: 'top-center',
  })
}

export const showToast = (message: string, type: TypeOptions | undefined) => {
  toast(message, {
    type: type || 'success',
    autoClose: 1000,
    position: 'top-center',
  })
}
