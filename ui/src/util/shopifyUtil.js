const cookieSegments = document.cookie.match('(^|;) ?shop_origin=([^;]*)(;|$)');

const shopOriginFromCookie = cookieSegments ? cookieSegments[2] : null;

const shopOriginFromUrl = new URLSearchParams(window.location.search).get('shop');

const shopOrigin = shopOriginFromCookie || shopOriginFromUrl;

export default shopOrigin;
