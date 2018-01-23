import { getVideoId, URL_PARAM_VIDEO } from './youtube';

describe('YouTube Helpers', () => {
  test('URL_PARAM_VIDEO is `v=`', () => {
    expect(URL_PARAM_VIDEO).toBe('v=');
  });

  describe('getVideoId returns a video id', () => {
    const videoId = 'a_bC-123';

    test('for full URLs', () => {
      expect(getVideoId(`http://www.youtube.com/watch?v=${videoId}`)).toBe(videoId);
      expect(getVideoId(`https://www.youtube.com/watch?v=${videoId}`)).toBe(videoId);
      expect(getVideoId(`http://youtube.com/watch?v=${videoId}`)).toBe(videoId);
      expect(getVideoId(`https://youtube.com/watch?v=${videoId}`)).toBe(videoId);
    });

    test('for short URLs', () => {
      expect(getVideoId(`https://youtu.be/${videoId}`)).toBe(videoId);
    });
  });
});
