import styles from './SlidesAdd.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import ActionLayout from '~/layouts/ActionLayout';
import images from '~/assets/Image';
import { useRef, useState, useEffect } from 'react';
import * as HandleImageFile from '~/utils/HandleImageFile';
import { propsType } from '~/types/ErrorType';
import checkError from '~/utils/InputError';
import ErrorInput from '~/components/ErrorInput';

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
   const [Errors, setErrors] = useState<propsType>({
      heading: '',
      primaryButtonText: '',
      primaryButtonLink: '',
      description: '',
      imageFile: null,
   });

   const [isHeadingTouched, setIsHeadingTouched] = useState<boolean>(false);
   const [isPrimaryButtonTextTouched, setIsPrimaryButtonTextTouched] =
      useState<boolean>(false);
   const [isPrimaryButtonLinkTouched, setIsPrimaryButtonLinkTouched] =
      useState<boolean>(false);
   const [isDescriptionTouched, setIsDescriptionTouched] =
      useState<boolean>(false);
   const [isImageFileTouched, setIsImageFileTouched] = useState<boolean>(false);

   const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      setState: React.Dispatch<React.SetStateAction<string>>,
      fieldName: keyof propsType,
      setTouched: React.Dispatch<React.SetStateAction<boolean>>,
   ) => {
      setErrors((prevErrors) => ({
         ...prevErrors,
         [fieldName]: e.target.value,
      }));
      setState(e.target.value);
      setTouched(true);
   };
   const nameImageFile = 'slide-image';
   const nameButtonSubmit = 'Create Slide';

   useEffect(() => {
      document.title = 'Add Slide | MrGianStore';

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

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
                           onChange={(e) =>
                              handleInputChange(
                                 e,
                                 setHeading,
                                 'heading',
                                 setIsHeadingTouched,
                              )
                           }
                           value={heading}
                        />
                        {isHeadingTouched && checkError(Errors).heading && (
                           <ErrorInput
                              nameError={checkError(Errors).heading as string}
                           />
                        )}
                     </div>
                     <div className={cx('primary-Button-Text')}>
                        <label htmlFor="primary-Button-Text">
                           Primary Button Text
                        </label>
                        <input
                           name="primary-Button-Text"
                           id="primary-Button-Text"
                           type="text"
                           onChange={(e) =>
                              handleInputChange(
                                 e,
                                 setPrimaryButtonText,
                                 'primaryButtonText',
                                 setIsPrimaryButtonTextTouched,
                              )
                           }
                           value={primaryButtonText}
                        />
                        {isPrimaryButtonTextTouched &&
                           checkError(Errors).primaryButtonText && (
                              <ErrorInput
                                 nameError={
                                    checkError(Errors)
                                       .primaryButtonText as string
                                 }
                              />
                           )}
                     </div>
                     <div className={cx('primary-Button-Link')}>
                        <label htmlFor="primary-Button-Link">
                           Primary Button Link
                        </label>
                        <input
                           name="primary-Button-Link"
                           id="primary-Button-Link"
                           type="text"
                           onChange={(e) =>
                              handleInputChange(
                                 e,
                                 setPrimaryButtonLink,
                                 'primaryButtonLink',
                                 setIsPrimaryButtonLinkTouched,
                              )
                           }
                           value={primaryButtonLink}
                        />
                        {isPrimaryButtonLinkTouched &&
                           checkError(Errors).primaryButtonLink && (
                              <ErrorInput
                                 nameError={
                                    checkError(Errors)
                                       .primaryButtonLink as string
                                 }
                              />
                           )}
                     </div>
                     <div className={cx('secondary-Button-Text')}>
                        <label htmlFor="secondary-Button-Text">
                           Secondary Button Text
                        </label>
                        <input
                           name="secondary-Button-Text"
                           id="secondary-Button-Text"
                           type="text"
                           onChange={(e) =>
                              setSecondaryButtonText(e.target.value)
                           }
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
                           onChange={(e) =>
                              setSecondaryButtonLink(e.target.value)
                           }
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
                              onChange={(e) =>
                                 handleInputChange(
                                    e,
                                    setDescription,
                                    'description',
                                    setIsDescriptionTouched,
                                 )
                              }
                              value={description}
                              rows={9}
                           ></textarea>
                           {isDescriptionTouched &&
                              checkError(Errors).description && (
                                 <ErrorInput
                                    nameError={
                                       checkError(Errors).description as string
                                    }
                                 />
                              )}
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
                                 setIsImageFileTouched(true);
                                 setErrors((prevErrors) => ({
                                    ...prevErrors,
                                    imageFile: e.target.files?.[0],
                                 }));
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
                                 {imageUrl && (
                                    <img src={resizedImageUrl} alt="preview" />
                                 )}
                              </div>
                           </div>
                           {isImageFileTouched &&
                              checkError(Errors).imageFile && (
                                 <ErrorInput
                                    nameError={
                                       checkError(Errors).imageFile as string
                                    }
                                 />
                              )}

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
                              <label>{displaySlide}</label>
                           </div>
                        </div>
                     </div>
                  </>
               }
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
               setIsHeadingTouched={setIsHeadingTouched}
               setIsPrimaryButtonTextTouched={setIsPrimaryButtonTextTouched}
               setIsPrimaryButtonLinkTouched={setIsPrimaryButtonLinkTouched}
               setIsDescriptionTouched={setIsDescriptionTouched}
               setIsImageFileTouched={setIsImageFileTouched}
            />
         </DefaultLayout>
      </div>
   );
}

export default SlidesAdd;
