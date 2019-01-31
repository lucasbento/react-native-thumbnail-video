import React, { PureComponent } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { Thumbnail } from 'react-native-thumbnail-video';

const VIDEO = 'https://www.youtube.com/watch?v=lgj3D5-jJ74';
const TYPING_TIMEOUT = 700;

class App extends PureComponent {
  state = {
    url: VIDEO,
  };

  typingTimeout = null;
  handleChangeVideoUrl = url => {
    clearTimeout(this.typingTimeout);

    this.typingTimeout = setTimeout(() =>
      this.setState({
        url: url,
      }),
    TYPING_TIMEOUT);
  };

  render() {
    const { url } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            defaultValue={url}
            onChangeText={this.handleChangeVideoUrl}
          />
        </View>

        <Thumbnail
          url={url}
          blurRadius={1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
    justifyContent: 'center',
  },
  formContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    borderColor: '#CCC',
    borderWidth: 1,
    fontSize: 15,
    padding: 10,
  },
});

export default App;
