import { getVideoId } from './youtube';

describe('YouTube Helpers', () => {
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

    test('must extract youtube video ID from embed url', () => {
      expect(getVideoId('https://www.youtube.com/embed/HDrv4qMpClw')).toBe(
        'HDrv4qMpClw'
      );
      expect(
        getVideoId('https://www.youtube.com/embed/HDrv4qMpClw?rel=0')
      ).toBe('HDrv4qMpClw');
    });

    test('must extract youtube video ID from watch url', () => {
      expect(getVideoId('https://www.youtube.com/watch?v=HDrv4qMpClw')).toBe(
        'HDrv4qMpClw'
      );
      expect(
        getVideoId('https://www.youtube.com/watch?v=HDrv4qMpClw#t=0m10s')
      ).toBe('HDrv4qMpClw');
      expect(
        getVideoId(
          'https://www.youtube.com/watch?v=HDrv4qMpClw&feature=feedrec_grec_index'
        )
      ).toBe('HDrv4qMpClw');
    });

    test('must extract youtube video ID from old video type url', () => {
      expect(
        getVideoId(
          'https://www.youtube.com/v/HDrv4qMpClw?fs=1&amp;hl=en_US&amp;rel=0'
        )
      ).toBe('HDrv4qMpClw');
    });

    test('must return false when youtube video url invalid', () => {
      expect(
        getVideoId('https://www.youtube.com/channel/UCWFKCr40YwOZQx8FHU_ZqqQ')
      ).toBe(null);
    });
  });
});
