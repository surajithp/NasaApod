import React, { Component } from "react";
import { Text, View, Image, Alert, Button, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 0,
    right: 0
  }
});

export default class LoadMore extends Component {
  _onPressLoadMore = () => {
    this.props.onclick();
  };
  render() {
    return (
      <View style={styles.button}>
        <Button onPress={this._onPressLoadMore} title="Load More Images" />
      </View>
    );
  }
}
