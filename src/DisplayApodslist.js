import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet
} from "react-native";
const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 0,
    left: 0
  }
});

export default class DisplayApodlist extends Component {
  _keyExtractor = (item, index) => item.date;
  _onPressButton() {
    Alert.alert("You tapped the button!");
  }

  render() {
    console.log(this.props.images);
    return (
      <FlatList
        data={this.props.images}
        keyExtractor={this._keyExtractor}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={this._onPressButton}>
              <Image
                style={{ width: 100, height: 100 }}
                source={{
                  uri: item.url
                }}
              />
            </TouchableOpacity>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    );
  }
}
