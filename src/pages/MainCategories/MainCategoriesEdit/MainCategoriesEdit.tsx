import React, { useEffect, useState } from 'react'
import { DescriptionInput, ImageInput, NameInput, SlugInput, TitleInput } from '~/components/common'
import { useAuth } from '~/context/AuthContext'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'
import { useLocation } from 'react-router-dom'

import styles from './MainCategoriesEdit.module.scss'

const cx = classNames.bind(styles)

interface MainCategoriesType {
  name: string
  title: string
  slug: string
  description: string
  image: string
}

function MainCategoriesEdit(): JSX.Element {
  const location = useLocation()
  const path = location.pathname
  const { accessToken } = useAuth()

  const emptyMainCategory = {
    name: '',
    title: '',
    slug: '',
    description: '',
    image: '',
  }
  const [loading, setLoading] = useState<boolean>(true)
  const [category, setCategory] = useState<MainCategoriesType>(emptyMainCategory)

  const nameButtonSubmit: string = 'Edit Category'

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
          const category: MainCategoriesType = {
            name: resData.data.name,
            title: resData.data.title,
            slug: resData.data.slug,
            description: resData.data.description,
            image: resData.data.image,
          }
          setCategory(category)
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
    document.title = 'Edit Category | MrGianStore'
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className={cx('edit')}>
      <DefaultLayout active={'categories'} page={['Dashboard', 'Categories', 'Edit']}>
        <ActionLayout
          leftColumn={
            <React.Fragment>
              <NameInput label="Category Name" defaultValue={category.name} />
              <TitleInput label="Meta Title" defaultValue={category.title} />
              <SlugInput label="Slug" defaultValue={category.slug} />
              <DescriptionInput label="Description" defaultValue={category.description} />
            </React.Fragment>
          }
          rightColumn={
            <React.Fragment>
              <ImageInput imageSaved={category.image} />
            </React.Fragment>
          }
          nameButtonSubmit={nameButtonSubmit}
        />
      </DefaultLayout>
    </div>
  )
}

export default MainCategoriesEdit
