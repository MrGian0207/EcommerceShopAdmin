export type CustomContentToastifyType = {
   title?: string | null;
   button?: boolean;
   confirmButton?: string | null;
   rejectButton?: string | null;
   id?: string | null;
   path?: string | null;
   handleReject?: () => void;
   navigate?: boolean;
};
