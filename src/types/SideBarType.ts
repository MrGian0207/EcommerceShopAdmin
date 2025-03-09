import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export type SideBarType = {
  active?: string
  handleCloseSideBar?: () => void
  backGroundColor?: string
}

export type SideBarItemsType = {
  iconLeft: IconDefinition
  labels: string[]
  iconRight?: boolean
  active?: boolean
  route?: string
}
