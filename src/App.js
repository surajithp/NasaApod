/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";
import axios from "axios";
import DisplayApodslist from "./DisplayApodslist";
import LoadMore from "./LoadMore";

export default class App extends Component {
  state = { data: [], startdate: null };

  componentWillMount = async () => {
    todaydate = new Date().toISOString().slice(0, 10);
    let moment = require("moment");
    const tendays = moment()
      .subtract(8, "days")
      .calendar();
    const tendaysformat = moment(`${tendays}`).format("YYYY-MM-DD");
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=YPnh5fLrnPlqbVeCN86tba4qEEqrh9DrlLgkphhS&start_date=${tendaysformat}&end_date=${todaydate}`
    );
    console.log(response);
    imagedata = response.data;
    this.setState({ data: imagedata, startdate: tendaysformat });
  };

  loadMore = async () => {
    const previousenddate = this.state.startdate;
    let moment = require("moment");
    const enddate=moment(`${previousenddate}`).subtract(1,"days").format("YYYY-MM-DD")
    const startdate = moment(`${enddate}`)
      .subtract(8, "days")
      .calendar();
    const startdateformat = moment(`${startdate}`).format("YYYY-MM-DD");
    console.log(startdateformat);
    const responseapod = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=YPnh5fLrnPlqbVeCN86tba4qEEqrh9DrlLgkphhS&start_date=${startdateformat}&end_date=${enddate}`
    );
    console.log(responseapod);
    imagesdata = responseapod.data;
    this.setState(prevState => ({
      data: prevState.data.concat(imagesdata),
      startdate: startdateformat
    }));
  };

  render() {
    return (
      <View>
        <DisplayApodslist images={this.state.data} />
        <LoadMore onclick={this.loadMore} />
      </View>
    );
  }
}
