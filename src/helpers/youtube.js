export const URL_PARAM_VIDEO = 'v=';

export const getVideoId = url => {
  const urlParts = url.split('?');

  if (urlParts.length > 1 && urlParts[1].includes(URL_PARAM_VIDEO)) {
    return urlParts[1].split('v=')[1];
  }

  return url.split('/').pop();
};
