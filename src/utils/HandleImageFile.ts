import React from 'react';

export const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImageFile: React.Dispatch<React.SetStateAction<File | null>>,
    setImageUrl: React.Dispatch<React.SetStateAction<string>>,
    setResizedImageUrl: React.Dispatch<React.SetStateAction<string>>,
) => {
    const file = event.target.files && event.target.files[0];
    setImageFile(file);

    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const result = reader.result as string;
            setImageUrl(result);
            resizeImage(result, setResizedImageUrl);
        };
    }
};

const resizeImage = (
    imageUrl: string,
    setResizedImageUrl: React.Dispatch<React.SetStateAction<string>>,
) => {
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
            const resizedImageUrl = canvas.toDataURL();
            setResizedImageUrl(resizedImageUrl);
        }
    };
    img.src = imageUrl;
};

export const handleFileSelect = (
    fileInputRef: React.MutableRefObject<HTMLInputElement | null>,
) => {
    if (fileInputRef.current) {
        fileInputRef.current.click();
    }
};
