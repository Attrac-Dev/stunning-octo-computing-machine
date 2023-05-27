/**
 * Logs page information to the console based on the provided data.
 *
 * @param {object} data - The data object containing page information.
 * @param {string} data.title - The title of the page.
 * @param {string} data.pageName - The name of the page.
 * @returns {void}
 */
function pageLog(data) {
  const { title, pageName } = data;

  if (pageName && process.env.ENVIRONMENT === 'development') {
    console.log({
      message: 'success',
      pageName,
      title,
      environment: process.env.ENVIRONMENT
    });
  } else if (pageName && process.env.ENVIRONMENT === 'production') {
    console.log({
      message: 'successful page load'
    });
  } else {
    console.error({
      message: 'failure',
      pageName: 'none detected'
    });
  }
}

export { pageLog }