export const getVideoId = url => {
  const result = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  const videoIdWithParams = result[2];

  if (videoIdWithParams !== undefined) {
    const cleanVideoId = videoIdWithParams.split(/[^0-9a-z_-]/i)[0];

    return cleanVideoId;
  }

  return null;
};
