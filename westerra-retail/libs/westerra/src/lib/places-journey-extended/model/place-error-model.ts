const getMessageFromResponse = (error) => {
  const responseBody = error.error;
  if (responseBody && responseBody.errors && responseBody.errors[0] && responseBody.errors[0].message) {
    return responseBody.errors[0].message;
  } else {
    return undefined;
  }
};
export const parseError = (error) => {
  // TODO: should have more user-friendly messages
  if (error.error instanceof ErrorEvent) {
    // Client-side or network error.
    return {
      message: 'An unexpected error occurred',
    };
  } else if (error.status && `${error.status}`.startsWith('4')) {
    // Backend returns unsuccessful response code.  In case of 400, try to get a message from the
    // response.
    return {
      message: getMessageFromResponse(error) || `Error ${error.status}`,
    };
  } else {
    // Backend returns 5xx
    return {
      message: 'An unexpected server error occurred',
    };
  }
};
