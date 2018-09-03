<h1>
  react-native-thumbnail-video &middot;
 
  <a href="https://travis-ci.org/lucasbento/react-native-thumbnail-video">
    <img src="https://travis-ci.org/lucasbento/react-native-thumbnail-video.svg?branch=master" />
  </a>
</h1>
<p>
  Easily show thumbnails for videos using React Native.
</p>

## Demo

<p align="center">
  <img src="https://cdn.rawgit.com/lucasbento/react-native-thumbnail-video/master/media/demo.gif" width="250" />
</p>

> See the demo on Expo: [@lucasbento/react-native-thumbnail-video-example](https://expo.io/@lucasbento/react-native-thumbnail-video-example)

## Installation

```sh
yarn add react-native-thumbnail-video
```

## Usage

```jsx
import { Thumbnail } from 'react-native-thumbnail-video';

// ...
  render() {
    return (
      <Thumbnail url="https://www.youtube.com/watch?v=lgj3D5-jJ74" />
    )
  }
// ...
```

## Props

##### [Extends `Image` prop-types](https://facebook.github.io/react-native/docs/image.html#props)

##### `url` (string)
URL of the video

##### `type` ([string])
Can be either `default`, `high`, `medium`, `standard` or `maximum`.

##### `imageWidth` (number/string)
Width of the image. Defaults to the device width.

##### `imageHeight` (number/string)
Height of the image. Defaults to `200`.

##### `containerStyle` ([ViewPropTypes.style](https://facebook.github.io/react-native/docs/view.html#style))
Style of the container using `TouchableOpacity`.

##### `iconStyle` ([ImagePropTypes.style](https://facebook.github.io/react-native/docs/image.html#style))
Style of the icon image.

##### `showPlayIcon` (boolean)
Show play icon. Defaults to true.

##### `onPress` (function)
Function to be called when the user presses the thumbnail. Defaults to opening the video URL.

##### `onError` (function)
Function to be called when there's an error on the default `onPress` function.

##### `children` (component)
Custom component to render inside of the thumbnail.

## License

MIT © [Lucas Bento](http://github.com/lucasbento)
