import styles from './SlidesAdd.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import ActionLayout from '~/layouts/ActionLayout';
import images from '~/assets/Image';
import { useRef, useState } from 'react';
import * as HandleImageFile from '~/utils/HandleImageFile';

const cx = classNames.bind(styles);

function SlidesAdd(): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [resizedImageUrl, setResizedImageUrl] = useState<string>('');
  const [heading, setHeading] = useState<string>('');
  const [primaryButtonText, setPrimaryButtonText] = useState<string>('');
  const [primaryButtonLink, setPrimaryButtonLink] = useState<string>('');
  const [secondaryButtonText, setSecondaryButtonText] = useState<string>('');
  const [secondaryButtonLink, setSecondaryButtonLink] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [displaySlide, setDisplaySlide] = useState('abled');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const nameImageFile = 'slide-image';
  const nameButtonSubmit = 'Create Slide';

  return (
    <div className={cx('add')}>
      <DefaultLayout active={'slides'} page={['Dashboard', 'Slides', 'Add']}>
        <ActionLayout
          leftColumn={
            <>
              <div className={cx('heading')}>
                <label htmlFor="heading">Heading</label>
                <input
                  name="heading"
                  id="heading"
                  type="text"
                  onChange={(e) => setHeading(e.target.value)}
                  value={heading}
                />
              </div>
              <div className={cx('primary-Button-Text')}>
                <label htmlFor="primary-Button-Text">Primary Button Text</label>
                <input
                  name="primary-Button-Text"
                  id="primary-Button-Text"
                  type="text"
                  onChange={(e) => setPrimaryButtonText(e.target.value)}
                  value={primaryButtonText}
                />
              </div>
              <div className={cx('primary-Button-Link')}>
                <label htmlFor="primary-Button-Link">Primary Button Link</label>
                <input
                  name="primary-Button-Link"
                  id="primary-Button-Link"
                  type="text"
                  onChange={(e) => setPrimaryButtonLink(e.target.value)}
                  value={primaryButtonLink}
                />
              </div>
              <div className={cx('secondary-Button-Text')}>
                <label htmlFor="secondary-Button-Text">
                  Secondary Button Text
                </label>
                <input
                  name="secondary-Button-Text"
                  id="secondary-Button-Text"
                  type="text"
                  onChange={(e) => setSecondaryButtonText(e.target.value)}
                  value={secondaryButtonText}
                />
              </div>
              <div className={cx('secondary-Button-Link')}>
                <label htmlFor="secondary-Button-Link">
                  Secondary Button Link
                </label>
                <input
                  name="secondary-Button-Link"
                  id="secondary-Button-Link"
                  type="text"
                  onChange={(e) => setSecondaryButtonLink(e.target.value)}
                  value={secondaryButtonLink}
                />
              </div>
            </>
          }
          rightColumn={
            <>
              <div className={cx('image-container')}>
                <div className={cx('description')}>
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    rows={9}
                  ></textarea>
                </div>
                <div className={cx('image')}>
                  <div className={cx('title')}>
                    <label htmlFor="brands-image">Cover</label>
                    <p>1920 * 768</p>
                  </div>

                  <input
                    ref={fileInputRef}
                    name="brands-image"
                    id="brands-image"
                    type="file"
                    onChange={(e) => {
                      HandleImageFile.handleFileChange(
                        e,
                        setImageFile,
                        setImageUrl,
                        setResizedImageUrl,
                        1920,
                      );
                    }}
                  />
                  <div
                    onClick={() => {
                      HandleImageFile.handleFileSelect(fileInputRef);
                    }}
                    className={cx('image-custom')}
                  >
                    <div className="box">
                      <h4>Drop or Select Images</h4>
                      <img src={images.uploadImage} alt="" />
                    </div>
                    <div className={cx('preview-image')}>
                      {imageUrl && <img src={resizedImageUrl} alt="preview" />}
                    </div>
                  </div>

                  <div className={cx('disabled')}>
                    <div className={cx('toggle-box')}>
                      <input
                        onChange={(e) => {
                          e.target.checked === true
                            ? setDisplaySlide('disabled')
                            : setDisplaySlide('abled');
                        }}
                        type="checkbox"
                        id="toggle"
                      />
                      <label
                        htmlFor="toggle"
                        className={cx('toggle-switch')}
                      ></label>
                    </div>
                    <label>Disabled</label>
                  </div>
                </div>
              </div>
            </>
          }
          SetImageUrl={setImageUrl}
          heading={heading}
          primaryButtonText={primaryButtonText}
          primaryButtonLink={primaryButtonLink}
          secondaryButtonText={secondaryButtonText}
          secondaryButtonLink={secondaryButtonLink}
          description={description}
          ImageFile={imageFile}
          displaySlide={displaySlide}
          NameImageFile={nameImageFile}
          nameButtonSubmit={nameButtonSubmit}
        />
      </DefaultLayout>
    </div>
  );
}

export default SlidesAdd;
