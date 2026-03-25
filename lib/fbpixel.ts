declare global {
  interface Window {
    fbq: (...args: unknown[]) => void
  }
}

export const FB_PIXEL_ID = '2608175668814186'

export const pageview = () => {
  window.fbq('track', 'PageView')
}

export const trackLead = () => {
  window.fbq('track', 'Lead')
}

export const trackCompleteRegistration = () => {
  window.fbq('track', 'CompleteRegistration')
}

export const trackStartTrial = () => {
  window.fbq('track', 'StartTrial')
}
