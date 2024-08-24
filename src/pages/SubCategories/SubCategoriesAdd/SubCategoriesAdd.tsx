import React, { useEffect, useState } from 'react'
import OptionSelect from '~/components/common/OptionSelect'
import { ImageInput, Input } from '~/components/common/Type1'
import Loading from '~/components/Loading'
import { useAuth } from '~/context/AuthContext'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'

import { SubCategoriesRules } from '../SubCategoriesRules'
import styles from './SubCategoriesAdd.module.scss'

const cx = classNames.bind(styles)

interface OptionType {
  value: string
  label: string
}

function SubCategoriesAdd() {
  const { accessToken } = useAuth()
  const nameButtonSubmit = 'Create Sub Category'

  const [loading, setLoading] = useState(true)
  const [mainCategoriesOptions, setMainCategoriesOptions] = useState<OptionType[]>([])

  useEffect(() => {
    const handleSetDataOptions = (
      dataOptions: OptionType[],
      setDataOptions: React.Dispatch<React.SetStateAction<OptionType[]>>
    ) => {
      setDataOptions(dataOptions)
    }
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/categories/main-categories/name`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        const resData = await res.json()
        const mainCategories: OptionType[] = resData.data
        handleSetDataOptions(mainCategories, setMainCategoriesOptions)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [accessToken])

  useEffect(() => {
    document.title = 'Add Sub Category | MrGianStore'
  }, [])

  if (loading) return <Loading />

  return (
    <div className={cx('edit')}>
      <DefaultLayout active={'categories'} page={['Dashboard', 'Sub Categories', 'Add']}>
        <ActionLayout
          leftColumn={
            <React.Fragment>
              <Input name="name" label="Sub Category Name" rules={SubCategoriesRules.name} />
              <Input name="title" label="Meta Title" rules={SubCategoriesRules.title} />
              <Input name="slug" label="Slug" rules={SubCategoriesRules.slug} />
              <Input
                name="description"
                label="Description"
                rules={SubCategoriesRules.description}
              />
            </React.Fragment>
          }
          rightColumn={
            <>
              <div className={cx('right-column')}>
                <OptionSelect
                  label="Parent Category"
                  name="category"
                  options={mainCategoriesOptions}
                  rules={SubCategoriesRules.parentCategory}
                />
                <ImageInput rules={SubCategoriesRules.image} />
              </div>
            </>
          }
          nameButtonSubmit={nameButtonSubmit}
        />
      </DefaultLayout>
    </div>
  )
}

export default SubCategoriesAdd
