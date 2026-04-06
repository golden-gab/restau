export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', eventName, params)
}