import React from 'react';

export const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>,
  setImageUrl?: React.Dispatch<React.SetStateAction<string>>,
  setResizedImageUrl?: React.Dispatch<React.SetStateAction<string>>,
  size?: number,
) => {
  const file = event.target.files && event.target.files[0];
  setImageFile(file);
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const result = reader.result as string;
      setImageUrl && setImageUrl(result);
      size === 512 && resizeImage512(result, setResizedImageUrl);
      size === 1920 && resizeImage1920(result, setResizedImageUrl);
    };
  }
};

export const handleMultiFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setImageFileArray: React.Dispatch<React.SetStateAction<File[]>>,
  setImagePreviewArray?: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  const file = event.target.files && event.target.files[0];
  setImageFileArray((prevImageFileArray) => {
    return [...prevImageFileArray, file as File];
  });

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreviewArray &&
        setImagePreviewArray((prevPreviewImages) => {
          return [...prevPreviewImages, resizeImage1080(result)];
        });
    };
  }
};

const resizeImage512 = (
  imageUrl: string,
  setResizedImageUrl?: React.Dispatch<React.SetStateAction<string>>,
): string => {
  let resizedImageUrl: string = '';
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const maxWidth = 512;
      const maxHeight = 512;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);
      resizedImageUrl = canvas.toDataURL();
      setResizedImageUrl && setResizedImageUrl(resizedImageUrl);
    }
  };
  img.src = imageUrl;
  return img.src;
};

const resizeImage1920 = (
  imageUrl: string,
  setResizedImageUrl?: React.Dispatch<React.SetStateAction<string>>,
): string => {
  let resizedImageUrl: string = '';
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const maxWidth = 1920;
      const maxHeight = 768;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);
      resizedImageUrl = canvas.toDataURL();
      setResizedImageUrl && setResizedImageUrl(resizedImageUrl);
    }
  };
  img.src = imageUrl;
  return img.src;
};

const resizeImage1080 = (imageUrl: string): string => {
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const maxWidth = 1080;
      const maxHeight = 1080;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);
    }
  };
  img.src = imageUrl;
  return img.src;
};

export const handleFileSelect = (
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>,
) => {
  if (fileInputRef.current) {
    fileInputRef.current.click();
  }
};
