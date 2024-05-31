import { ReactNode } from "react";
export type FormAuthProps = {
    title: string;
    subtitle: string;
    suggestion?: string | null;
    children?: ReactNode;
    navigator?: string | null;
    navigatorLink?: string | null;
    back?: string | null;
};