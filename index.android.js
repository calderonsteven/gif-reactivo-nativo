/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class ozomNativos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // imageUrl: 'https://media1.giphy.com/media/rDIbIO2O7UStO/200w_d.gif',
      imageUrl: 'https://facebook.github.io/react/img/logo_og.png',
      imageSize: {
        height: 150,
        margin: 15,
        width: 150,
      },
      topic: 'cats'
    }
  }

  async _getRandomGif(topic) {
    try {
      let endPointUrl = 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+topic;
      let response = await fetch(endPointUrl);
      let responseJson = await response.json();
      let imageUrl = responseJson.data.fixed_width_downsampled_url;

      // TODO: make it dynamically
      // let imageSize = {
      //   margin: 15,
      //   height: responseJson.data.fixed_height_downsampled_height,
      //   width: responseJson.data.fixed_height_downsampled_width,
      // };

      this.setState({imageUrl});

      return responseJson.data;
    } catch(error) {
      console.error(error);
    }
  }

  render() {
    const topic = this.state.topic;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native Bitch!
        </Text>
        <TextInput
          style={styles.textInputs}
          onChangeText={(topic) => this.setState({topic})}
          value={this.state.topic}  />
        <Image
          style={styles.gifImage}
          source={{uri: this.state.imageUrl}}
        />
        <Button
          onPress={this._getRandomGif.bind(this)}
          title={'More ' + this.state.topic}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  textInputs: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    textAlign: 'center',
    width: 200,
  },
  gifImage: {
    margin: 15,
    height: 200,
    width: 300,
  }
});

AppRegistry.registerComponent('ozomNativos', () => ozomNativos);
