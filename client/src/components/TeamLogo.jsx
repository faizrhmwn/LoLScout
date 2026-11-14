import React, { useState } from 'react'

export default function TeamLogo({ shortName, alt, className = "w-12 h-12" }) {
  const [useFallback, setUseFallback] = useState(false)
  const logoSrc = shortName
    ? (useFallback ? `/logos/${shortName}.svg` : `/logos/${shortName}.png`)
    : '/favicon.svg'

  return (
    <img
      src={logoSrc}
      alt={alt || shortName}
      onError={() => {
        if (!useFallback) setUseFallback(true)
      }}
      className={`${className} object-contain shrink-0 [filter:drop-shadow(0_0_1.5px_rgba(255,255,255,0.45))]`}
      decoding="async"
    />
  )
}
