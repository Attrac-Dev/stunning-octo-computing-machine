/**
 * Set a cookie with the given name and value.
 *
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {number} [days] - Optional. The number of days until the cookie expires.
 * @param {object} [options] - Optional. Additional options for the cookie.
 * @param {string} [options.sameSite] - Optional. The `SameSite` attribute of the cookie.
 * @param {boolean} [options.httpOnly] - Optional. Whether to set the `HttpOnly` attribute of the cookie.
 * @param {boolean} [options.secure] - Optional. Whether to set the `Secure` attribute of the cookie.
 */
function setCookie(name, value, days, options = {}) {
    let expires = '';
    if (days) {
      const date = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
      expires = `expires=${date.toUTCString()}; `;
    }
    const { sameSite, httpOnly, secure } = options;
    const cookieOptions = [
      sameSite ? `SameSite=${sameSite};` : '',
      httpOnly ? 'HttpOnly;' : '',
      secure ? 'Secure;' : '',
    ].join(' ');
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}${cookieOptions}path=/`;
  }
  
  
/**
 * Gets the value of a cookie by name.
 * @param {string} name - The name of the cookie to get.
 * @returns {?string} - The value of the cookie if found, or null if not found.
 */
  function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith(nameEQ)) {
        console.log(decodeURIComponent(cookie.substring(nameEQ.length)))
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    return null;
  }  


  /**
 * Checks if any cookies are present.
 *
 * @returns {boolean} Returns `true` if at least one cookie is present, otherwise `false`.
 */
  function hasCookie() {
    const cookies = document.cookie.split(';');
    return cookies.length > 0;
  }


/**
 * Retrieves an array of objects representing all cookies present on the current page.
 *
 * @returns {Array<Object>|null} An array of cookie objects, each containing a `name` and `value` property, or null if no cookies were found.
 */
  function getCookies() {
    const hasAnyCookie = hasCookie()
    if (hasAnyCookie) {
        const cookies = document.cookie.split(';');
        const cookieList = [];
        cookies.forEach((cookie) => {
          const cookieParts = cookie.split('=');
          if (cookieParts.length >= 2) {
            const name = cookieParts[0].trim();
            const value = cookieParts.slice(1).join('=').trim();
            cookieList.push({ name, value });
          }
        });
        return cookieList;
    } else {
        console.log('no cookies found')
        return null
    }
  }
  
  

export { setCookie, getCookie, hasCookie, getCookies }