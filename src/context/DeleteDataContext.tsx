import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import CustomContentToastify from '~/components/CustomContentToastify'
import * as Toastify from '~/services/Toastify'
import { useNavigate } from 'react-router-dom'
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
  path: string
}

const emptyDeleteResult: deletedDataType = {
  id: '',
  name: '',
  path: '',
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
  const navigator = useNavigate()

  const handleDeleteData = useCallback(
    async (path: string) => {
      setIsDeleting(true)
      try {
        Toastify.showToastMessagePending()
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
          navigator(path)
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
    [deletedData.id, handleUpdateLayoutApp, navigator]
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
          handleConfirm={() => {
            handleDeleteData(deletedData.path)
          }}
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
  }, [deletedData.id, deletedData.name, deletedData.path, handleDeleteData])

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
