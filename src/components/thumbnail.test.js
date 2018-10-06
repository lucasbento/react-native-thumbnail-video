import React from 'react';
import {Image, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import Thumbnail from './thumbnail';
import {DEFAULT_WIDTH, TYPES} from './constants';
import { getVideoId } from '../helpers/index';

const testUrl = 'http://www.youtube.com/watch?v=abc123';

describe('Thumbnail Component', () => {
  test('snapshot matches', () => {
    const tree = renderer.create(
      <Thumbnail url={testUrl} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('initial state', () => {
    const instance = renderer.create(
      <Thumbnail url={testUrl} />
    ).getInstance();

    expect(instance.state.videoId).toEqual('abc123');
  });

  test('getType returns type', () => {
    const type = Object.keys(TYPES)[0];

    const instance = renderer.create(
      <Thumbnail type={type} url={testUrl} />
    ).getInstance();

    expect(instance.getType()).toEqual(type);
  });

  describe('renders', () => {

    test('must render nothing when url is invalid', () => {
      const instance = renderer.create(
          <Thumbnail url='not valid url' />
      ).root;

      expect(() => {
        instance.findByProps({'testId': 'thumbnail-image'});
      }).toThrow();
    });

    test('thumbnail-image', () => {
      const instance = renderer.create(
        <Thumbnail url={testUrl} />
      ).root;

      const element = instance.findByProps({'testId': 'thumbnail-image'});

      expect(element).not.toBeNull();

      expect(element.props.source.testUri).toContain('assets/play.png');
    });

    test('thumbnail-image-background', () => {
      const type = Object.keys(TYPES)[0];
      const instance = renderer.create(
        <Thumbnail type={type} url={testUrl} />
      ).root;

      const element = instance.findByProps({'testId': 'thumbnail-image-background'});

      expect(element).not.toBeNull();

      expect(element.props.source.uri).toContain('/abc123');
      expect(element.props.source.uri).toContain(`${type}.jpg`);
    });
  });

  test('defaultProps', () => {
    expect(Thumbnail.defaultProps.imageHeight).toEqual(200);
    expect(Thumbnail.defaultProps.imageWidth).toBe(DEFAULT_WIDTH);
    expect(Thumbnail.defaultProps.onPressError).toBeDefined();
    expect(Thumbnail.defaultProps.type).toBe('high');
  });

  test('propTypes', () => {
    expect(Thumbnail.propTypes.children).toBe(PropTypes.node);
    expect(Thumbnail.propTypes.containerStyle).toBe(ViewPropTypes.style);
    expect(Thumbnail.propTypes.iconStyle).toBe(Image.propTypes.style);
    expect(Thumbnail.propTypes.onPress).toBe(PropTypes.func);
    expect(Thumbnail.propTypes.onPressError).toBe(PropTypes.func);
    expect(Thumbnail.propTypes.style).toBe(ViewPropTypes.style);
    expect(Thumbnail.propTypes.url).toBe(PropTypes.string.isRequired);

    // Validate prop logging
    spyOn(console, 'error');

    expect(arePropsValid({imageHeight: 42})).toBeTruthy();
    expect(arePropsValid({imageHeight: '42'})).toBeTruthy();
    expect(arePropsValid({imageWidth: 42})).toBeTruthy();
    expect(arePropsValid({imageWidth: '42'})).toBeTruthy();

    Object.keys(TYPES).forEach((type) => {
      expect(arePropsValid({type: Object.keys(TYPES)[0]})).toBeTruthy();
    })

    expect(arePropsValid({type: '1inval1d'})).toBeFalsy();
    expect(console.error.calls.argsFor(0)[0]).toMatch(/Invalid/);
  });
});

function arePropsValid(props) {
  const initialErrorCount = console.error.calls.count();

  const requiredProps = {url: 'anything'}; // required props here

  PropTypes.checkPropTypes(Thumbnail.propTypes, {...requiredProps, ...props}, 'prop', 'Thumbnail');

  return initialErrorCount === console.error.calls.count();
}
