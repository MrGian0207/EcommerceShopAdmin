import { toast } from 'react-toastify';
import CustomContentToastify from '~/components/CustomContentToastify';

let toastId: any = null;

export const showToastMessagePending = () => {
    toastId = toast.loading('Processing...', {
        position: 'top-center',
    });
};

export const showToastMessageSuccessfully = (message: string) => {
    toast.update(toastId, {
        render: `${message}`,
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        position: 'top-center',
    });
};

export const showToastMessageFailure = (message: string) => {
    toast.update(toastId, {
        render: `${message}`,
        type: 'error',
        isLoading: false,
        autoClose: 3000,
        position: 'top-center',
    });
};

export const handleDeteleToastify = (
    name: string,
    id: string,
    path: string,
    SetDeleteButtonOnclick?: React.Dispatch<React.SetStateAction<boolean>>,
    navigate?: boolean
) => {

    const closeToast = () => {
        SetDeleteButtonOnclick && SetDeleteButtonOnclick(false);
        toast.dismiss(ToastId);
    };

    const ToastId = toast.warning(
        <CustomContentToastify
            title={`Do you wanna delete ${name}`}
            button={true}
            confirmButton={'Confirm'}
            rejectButton={'Cancel'}
            id={id}
            path={path}
            handleReject={closeToast}
            navigate={navigate}
        />,
        {
            position: 'top-center',
            autoClose: 3000,
            onClose: () => {
                SetDeleteButtonOnclick && SetDeleteButtonOnclick(false);
            },
        },
    );
};
