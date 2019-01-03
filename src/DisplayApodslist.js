import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from "react-native";
const styles = StyleSheet.create({
  footer: {
    height: 40
  }
});

export default class DisplayApodlist extends Component {
  _keyExtractor = (item, index) => item.date;
  _onPressButton() {
    console.log("Hi");
  }

  render() {
    // console.log(this.props.images);
    // console.log(this.props.images.length);
    // let activeindicator;
    // if (this.props.images.length === 0) {
    //   activeindicator = <ActivityIndicator size="large" color="#0000ff" />;
    // } else {
    //   activeindicator = null;
    // }

    return (
      <View>
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
              <Text>{item.date}</Text>
            </View>
          )}
          ListFooterComponent={() => <View style={styles.footer} />}
        />
      </View>
    );
  }
}
