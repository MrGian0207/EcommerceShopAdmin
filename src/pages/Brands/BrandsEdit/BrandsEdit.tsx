import React, { useEffect, useState } from 'react'
import { ImageInput, Input } from '~/components/common/Type1'
import { useAuth } from '~/context/AuthContext'
import { usePath } from '~/context/PathContext'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import { BranchType, emptyBranch } from '~/types/DataType'
import classNames from 'classnames/bind'

import { BrandRules } from '../BrandRules'
import BrandSkeleton from '../BrandSkeleton/BrandSkeleton'
import styles from './BrandsEdit.module.scss'

const cx = classNames.bind(styles)

function BrandsEdit(): JSX.Element {
  const { path } = usePath()
  const { accessToken } = useAuth()
  const [loading, setLoading] = useState<boolean>(true)
  const [branch, setBranch] = useState<BranchType>(emptyBranch)

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
          setBranch({
            name: resData.data.name,
            title: resData.data.title,
            slug: resData.data.slug,
            description: resData.data.description,
            image: resData.data.image,
          })
        } catch (error) {
          console.log(error)
        } finally {
          setTimeout(() => {
            setLoading(false)
          }, 500)
        }
      }
    }

    fetchData()
  }, [accessToken, path])

  useEffect(() => {
    document.title = 'Edit Brand | MrGianStore'
  }, [])

  return (
    <div className={cx('add')}>
      <DefaultLayout active={'brands'} page={['Dashboard', 'Brands', 'Edit']}>
        {loading ? (
          <BrandSkeleton />
        ) : (
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
                <Input
                  name="slug"
                  label="Slug"
                  defaultValue={branch.slug}
                  rules={BrandRules.slug}
                />
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
            nameButtonSubmit={'Edit Brand'}
          />
        )}
      </DefaultLayout>
    </div>
  )
}

export default BrandsEdit
