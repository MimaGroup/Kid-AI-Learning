declare global {
  interface Window {
    fbq: (...args: unknown[]) => void
  }
}

export const FB_PIXEL_ID = '26081756688144186'

// The pixel script only loads after marketing-cookie consent (see components/facebook-pixel.tsx)
// and is hard-disabled on /kids/* routes, so window.fbq may legitimately not exist — these
// tracking calls must no-op safely instead of throwing.
function safeFbq(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(...args)
  }
}

export const pageview = () => {
  safeFbq('track', 'PageView')
}

export const trackLead = () => {
  safeFbq('track', 'Lead')
}

export const trackCompleteRegistration = () => {
  safeFbq('track', 'CompleteRegistration')
}

export const trackStartTrial = () => {
  safeFbq('track', 'StartTrial')
}
