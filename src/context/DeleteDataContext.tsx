import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import CustomContentToastify from '~/components/CustomContentToastify'
import * as Toastify from '~/services/Toastify'
import { toast } from 'react-toastify'

import { useUpdateLayout } from './UpdateLayoutContext'

interface resultType {
  message: string
  type: string
}

const emptyResult: resultType = {
  message: '',
  type: '',
}

interface deletedDataType {
  id: string
  name: string
}

const emptyDeleteResult: deletedDataType = {
  id: '',
  name: '',
}

interface DeleteDataContextType {
  result: resultType
  setResult: React.Dispatch<React.SetStateAction<resultType>>
  isDeleting: boolean
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>
  deletedData: deletedDataType
  setDeletedData: React.Dispatch<React.SetStateAction<deletedDataType>>
}

const DeleteDataContext = createContext<DeleteDataContextType>({
  result: emptyResult,
  setResult: () => {},
  isDeleting: true,
  setIsDeleting: () => {},
  deletedData: emptyDeleteResult,
  setDeletedData: () => {},
})

export const useDeleteData = () => {
  return useContext(DeleteDataContext)
}

export const DeleteDataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { handleUpdateLayoutApp } = useUpdateLayout()
  const [isDeleting, setIsDeleting] = useState(false)
  const [deletedData, setDeletedData] = useState(emptyDeleteResult)
  const [result, setResult] = useState(emptyResult)

  const handleDeleteData = useCallback(
    async (path: string) => {
      setIsDeleting(true)
      try {
        Toastify.showToastMessagePending()
        console.log(deletedData.id)
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}${path}/delete/${deletedData.id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          }
        )

        const data = await response.json()

        if (response.ok) {
          handleUpdateLayoutApp()
          Toastify.showToastMessageSuccessfully(data.message)
        } else {
          Toastify.showToastMessageFailure(data?.message)
        }
      } catch (error) {
        console.error(error)
        Toastify.showToastMessageFailure('Delete data failure')
      } finally {
        setIsDeleting(false)
        setDeletedData(emptyDeleteResult)
      }
    },
    [deletedData.id]
  )

  useEffect(() => {
    if (deletedData.id && deletedData.name) {
      const handleCancel = () => {
        toast.dismiss(ToastId)
        setDeletedData(emptyDeleteResult)
      }

      const ToastId = toast(
        <CustomContentToastify
          title={`Do you wanna delete ${deletedData.name}`}
          handleConfirm={handleDeleteData}
          handleCancel={handleCancel}
        />,
        {
          position: 'top-center',
          autoClose: 1000,
          onClose: handleCancel,
        }
      )

      return () => {
        toast.dismiss(ToastId)
      }
    }
  }, [deletedData.id, deletedData.name, handleDeleteData])

  return (
    <DeleteDataContext.Provider
      value={{
        result,
        setResult,
        isDeleting,
        setIsDeleting,
        deletedData,
        setDeletedData,
      }}
    >
      {children}
    </DeleteDataContext.Provider>
  )
}
