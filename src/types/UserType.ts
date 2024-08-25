export type User = {
  _id: string
  name: string
  gender: string
  phone: string
  email: string
  password: string
  status: string
  role: string
  about: string
  image: string
}

export const emptyDataUser: User = {
  _id: '',
  name: '',
  gender: '',
  phone: '',
  email: '',
  password: '',
  status: '',
  role: '',
  about: '',
  image: '',
}
