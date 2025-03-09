import React from 'react'

import { useTranslation } from 'react-i18next'
import { Tooltip } from 'react-tooltip'

interface TooltipProps {
  children: React.ReactNode
  message: string
}

function CustomTooltip({ children, message }: TooltipProps) {
  const { t } = useTranslation('common')

  return (
    <div data-tooltip-id={`hasTooltip-${message}`}>
      {children}
      <Tooltip
        id={`hasTooltip-${message}`}
        place="bottom"
        style={{
          borderRadius: '3px',
          padding: '6px 8px',
          fontSize: '12px',
        }}
      >
        <p>{t(`tooltip.${message.toLowerCase().replace(' ', '_')}`)}</p>
      </Tooltip>
    </div>
  )
}

export default CustomTooltip
