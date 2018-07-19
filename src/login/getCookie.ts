import * as setCookieParser from 'set-cookie-parser';

export default (cookies: setCookieParser.Cookie[], cookieName: string) => {
  const filteredCookies = cookies.filter((cookie) => {
    return cookie.name === cookieName;
  });
  if (filteredCookies.length === 0) {
    throw new Error(`Cookie (${cookieName}) not found`);
  }
  if (filteredCookies.length > 1) {
    throw new Error(`Duplicate cookie (${cookieName})`);
  }
  return filteredCookies[0].value;
};
