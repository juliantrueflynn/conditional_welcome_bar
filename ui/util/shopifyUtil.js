const cookieSegments = document.cookie.match('(^|;) ?shop_origin=([^;]*)(;|$)')

const shopOriginFromCookie = cookieSegments ? cookieSegments[2] : null

const shopOriginFromUrl = new URLSearchParams(window.location.search).get('shop')

export const shopOrigin = shopOriginFromCookie || shopOriginFromUrl

export const locale = new URLSearchParams(window.location.search).get('locale')
