import React, { useRef } from 'react'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'

import styles from '../../ProductAdd/ProductAdd.module.scss'

const cx = classNames.bind(styles)

function Tag({
  tags,
  setTags,
}: {
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
}) {
  const { t } = useTranslation('product')

  const TagInputRef = useRef<HTMLInputElement>(null)
  const handleAddNewTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const inputElement = e.target as HTMLInputElement
      const newTag = inputElement.value.trim()
      if (newTag !== '') {
        setTags((prevTags: string[]) => {
          return [...prevTags, newTag]
        })
        inputElement.value = ''
      }
    }
  }

  const handleDeleteTag = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, tag: string) => {
    e.preventDefault()
    setTags((prevTags: string[]) => {
      const index = prevTags.indexOf(tag)
      if (index !== -1) {
        const newTags = [...prevTags]
        newTags.splice(index, 1)
        return newTags
      }
      return prevTags
    })
  }

  const handleDeleteAllTag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setTags([])
    TagInputRef.current && (TagInputRef.current.value = '')
  }

  return (
    <div className={cx('tag')}>
      <label htmlFor="tag">{t('tags', { ns: 'form' })}</label>
      <div className={cx('tag-input-box')}>
        {tags.length > 0 && (
          <ul className={cx('show-tagName')}>
            {tags.map((tag, index) => (
              <li key={`${tag}-${index}`}>
                <p>{tag}</p>
                <button
                  className={cx('delete-tag')}
                  onClick={(e) => {
                    handleDeleteTag(e, tag)
                  }}
                >
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </li>
            ))}
          </ul>
        )}
        <input ref={TagInputRef} id="tag" type="text" onKeyDown={handleAddNewTag} />

        {tags.length > 0 && (
          <div className={cx('clear-all-tags')} onClick={handleDeleteAllTag}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Tag
