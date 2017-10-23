<h1 align="center">react-native-thumbnail-video</h1>
<p align="center">
  Easily show thumbnails for videos.
</p>

## Installation

```sh
yarn add react-native-thumbnail-video
```

## Usage

```jsx
import Thumbnail from 'react-native-thumnail-video';

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

##### `imageWidth` (number)
Width of the image. Defaults to the device width.

##### `imageHeight` (number)
Height of the image. Defaults to `200`.

##### `containerStyle` ([ViewPropTypes.style](https://facebook.github.io/react-native/docs/view.html#style))
Style of the container using `TouchableOpacity`.

##### `iconStyle` ([ImagePropTypes.style](https://facebook.github.io/react-native/docs/image.html#style))
Style of the icon image.

##### `onPress` (function)
Function to be called when the user presses the thumbnail. Defaults to opening the video URL.

##### `onPress` (function)
Function to be called when there's an error on the default `onPress` function.

## License

MIT © [Lucas Bento](http://github.com/lucasbento)