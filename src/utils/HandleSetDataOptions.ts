import React from 'react'

import { OptionType } from '~/types/DataType'

export const handleSetDataOptions = (
  dataOptions: OptionType[],
  setDataOptions: React.Dispatch<React.SetStateAction<OptionType[]>>
) => {
  setDataOptions(dataOptions)
}
