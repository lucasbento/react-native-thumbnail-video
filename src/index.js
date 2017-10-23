import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
  ViewPropTypes,
  ImagePropTypes,
  Linking,
  StyleSheet,
} from 'react-native';

const { width } = Dimensions.get('window');

const URL_PARAM_VIDEO = 'v=';

const getVideoId = url => {
  const urlParts = url.split('?');

  if (urlParts.length > 1 && urlParts[1].includes(URL_PARAM_VIDEO)) {
    return urlParts[1].split('v=')[1];
  }

  return url.split('/').pop();
};

const TYPES = {
  'default': 'default',
  high: 'hqdefault',
  medium: 'mqdefault',
  standard: 'sddefault',
  maximum: 'maxresdefault',
};

class Thumbnail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      videoId: getVideoId(props.url),
    };
  }

  static propTypes = {
    ...ImageBackground.propTypes,
    url: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.keys(TYPES)),
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
    style: ViewPropTypes.style,
    containerStyle: ViewPropTypes.style,
    iconStyle: Image.propTypes.style,
    onPress: PropTypes.func,
    onPressError: PropTypes.func,
  };

  static defaultProps = {
    type: 'high',
    imageWidth: width,
    imageHeight: 200,
    onPressError: () => {},
  };

  componentWillUpdate(nextProps) {
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
    const {
      imageWidth,
      imageHeight,
      containerStyle,
      iconStyle,
      ...props,
    } = this.props;

    const imageURL = `http://img.youtube.com/vi/${videoId}/${this.getType()}.jpg`;

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
          {...props}
        >
          <Image
            source={require('./assets/play.png')}
            style={[styles.playIcon, iconStyle]}
          />
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

export default Thumbnail;
