import React, { useEffect, useState } from 'react'
import { ImageInput, Input } from '~/components/common/Type1'
import Loading from '~/components/Loading'
import { useAuth } from '~/context/AuthContext'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'
import { useLocation } from 'react-router-dom'

import { BrandRules } from '../BrandRules'
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

  if (loading) return <Loading />

  return (
    <div className={cx('add')}>
      <DefaultLayout active={'brands'} page={['Dashboard', 'Brands', 'Edit']}>
        <ActionLayout
          leftColumn={
            <React.Fragment>
              <Input
                name="name"
                label="Brand Name"
                defaultValue={branch.name}
                rules={BrandRules.name}
              />
              <Input
                name="title"
                label="Meta Title"
                defaultValue={branch.title}
                rules={BrandRules.title}
              />
              <Input name="slug" label="Slug" defaultValue={branch.slug} rules={BrandRules.slug} />
              <Input
                name="description"
                label="Description"
                defaultValue={branch.description}
                rules={BrandRules.description}
              />
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
