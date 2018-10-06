import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  ImageBackground,
  Image,
  ViewPropTypes,
  ImagePropTypes,
  Linking,
  StyleSheet,
} from 'react-native';

import { DEFAULT_WIDTH, TYPES } from './constants';
import { getVideoId } from '../helpers';

export default class Thumbnail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      videoId: getVideoId(props.url),
    };
  }

  static propTypes = {
    ...ImageBackground.propTypes,
    children: PropTypes.node,
    containerStyle: ViewPropTypes.style,
    imageHeight: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    imageWidth: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    iconStyle: Image.propTypes.style,
    onPress: PropTypes.func,
    onPressError: PropTypes.func,
    style: ViewPropTypes.style,
    type: PropTypes.oneOf(Object.keys(TYPES)),
    url: PropTypes.string.isRequired,
    showPlayIcon: PropTypes.bool
  };

  static defaultProps = {
    type: 'high',
    imageHeight: 200,
    imageWidth: DEFAULT_WIDTH,
    onPressError: () => {},
    showPlayIcon: true
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const videoId = getVideoId(nextProps.url);

    if(videoId !== prevState.videoId){
      return { videoId };
    }

    return null;
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (this.props.url === nextProps.url || !nextProps.url) {
      return;
    }

    this.setState({
      videoId: getVideoId(nextProps.url),
    });
  }

  getType = () => TYPES[this.props.type];

  onPress = () => {
    const { url, onPress, onPressError } = this.props;

    if (onPress) {
      return onPress(url);
    }

    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        return;
      }

      return Linking.openURL(url);
    }).catch(onPressError);
  };

  render() {
    const { videoId } = this.state;

    if(!videoId){
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Invalid "url" could not extract videoId from "${this.props.url}"`);
      }

      return null;
    }

    const {
      imageWidth,
      imageHeight,
      containerStyle,
      iconStyle,
      children,
      showPlayIcon,
      ...props
    } = this.props;

    const imageURL = `https://img.youtube.com/vi/${videoId}/${this.getType()}.jpg`;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={containerStyle}
        onPress={this.onPress}
      >
        <ImageBackground
          source={{ uri: imageURL }}
          style={[
            styles.imageContainer,
            {
              width: imageWidth,
              height: imageHeight,
            },
          ]}
          testId='thumbnail-image-background'
          {...props}
        >
        {
          showPlayIcon ? (
            <Image
              source={require('../assets/play.png')}
              style={[styles.playIcon, iconStyle]}
              testId='thumbnail-image'
            />
          ) : (
            null
          )
        }


          {children}
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    tintColor: 'white',
  },
});
