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

const TYPES = {
  'default': 'default',
  high: 'hqdefault',
  medium: 'mqdefault',
  standard: 'sddefault',
  maximum: 'maxresdefault',
};

export default class Thumbnail extends PureComponent {
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
    children: PropTypes.node,
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
      children,
      ...props,
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
          {...props}
        >
          <Image
            source={require('./assets/play.png')}
            style={[styles.playIcon, iconStyle]}
          />

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
