import React, { useEffect, useState } from 'react'
import { DescriptionInput, ImageInput, NameInput, SlugInput, TitleInput } from '~/components/common'
import { useAuth } from '~/context/AuthContext'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'
import { useLocation } from 'react-router-dom'

import styles from './BrandsEdit.module.scss'

const cx = classNames.bind(styles)

interface BranchType {
  name: string
  title: string
  slug: string
  description: string
  image: string
}

function BrandsEdit(): JSX.Element {
  const location = useLocation()
  const path = location.pathname
  const { accessToken } = useAuth()

  const emptyBranch = {
    name: '',
    title: '',
    slug: '',
    description: '',
    image: '',
  }

  const [loading, setLoading] = useState<boolean>(true)
  const [branch, setBranch] = useState<BranchType>(emptyBranch)

  const nameButtonSubmit: string = 'Edit Brand'

  useEffect(() => {
    const fetchData = async () => {
      if (path) {
        try {
          const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          const resData = await res.json()
          const branch: BranchType = {
            name: resData.data.name,
            title: resData.data.title,
            slug: resData.data.slug,
            description: resData.data.description,
            image: resData.data.image,
          }
          setBranch(branch)
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchData()
  }, [accessToken, path])

  useEffect(() => {
    document.title = 'Edit Brand | MrGianStore'
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className={cx('add')}>
      <DefaultLayout active={'brands'} page={['Dashboard', 'Brands', 'Edit']}>
        <ActionLayout
          leftColumn={
            <React.Fragment>
              <NameInput label="Brand Name" defaultValue={branch.name} />
              <TitleInput label="Meta Title" defaultValue={branch.title} />
              <SlugInput label="Slug" defaultValue={branch.slug} />
              <DescriptionInput label="Description" defaultValue={branch.description} />
            </React.Fragment>
          }
          rightColumn={
            <React.Fragment>
              <ImageInput imageSaved={branch.image} />
            </React.Fragment>
          }
          nameButtonSubmit={nameButtonSubmit}
        />
      </DefaultLayout>
    </div>
  )
}

export default BrandsEdit
