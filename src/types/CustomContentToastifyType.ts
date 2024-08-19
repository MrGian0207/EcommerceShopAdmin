export type CustomContentToastifyType = {
  title?: string | null
  handleConfirm: (path: string) => void
  handleCancel: () => void
}
