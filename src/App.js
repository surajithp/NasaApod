/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button
} from "react-native";
import axios from "axios";
import DisplayApodslist from "./DisplayApodslist";
const dimensions = Dimensions.get("window");
const styles = StyleSheet.create({
  display: {
    height: dimensions.height-30,
    width: dimensions.width
  },
  button: {
    position: "absolute",
    bottom: 0,
    right: 0
  }
});

export default class App extends Component {
  state = { data: [], startdate: null };

  componentWillMount = async () => {
    let moment = require("moment");
    const todaydate = moment().format("YYYY-MM-DD");
    const start_date = moment()
      .subtract(9, "days")
      .format("YYYY-MM-DD");
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=YPnh5fLrnPlqbVeCN86tba4qEEqrh9DrlLgkphhS&start_date=${start_date}&end_date=${todaydate}`
    );
    imagedata = response.data;
    imagedata.reverse();
    this.setState({ data: imagedata, startdate: start_date });
  };

  loadMore = async () => {
    const previousenddate = this.state.startdate;
    let moment = require("moment");
    const enddate = moment(`${previousenddate}`)
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    const startdate = moment(`${enddate}`)
      .subtract(9, "days")
      .format("YYYY-MM-DD");
    const responseapod = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=YPnh5fLrnPlqbVeCN86tba4qEEqrh9DrlLgkphhS&start_date=${startdate}&end_date=${enddate}`
    );
    imagesdata = responseapod.data;
    imagesdata.reverse();
    this.setState(prevState => ({
      data: prevState.data.concat(imagesdata),
      startdate: startdate
    }));
  };

  render() {
    console.log(this.state.data);
    return (
      <View style={styles.display}>
        <DisplayApodslist images={this.state.data} />
        <View style={styles.button}>
          <Button onPress={this.loadMore} title="Load More Images" />
        </View>
      </View>
    );
  }
}
