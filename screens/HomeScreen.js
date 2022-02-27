import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import tw from "tailwind-react-native-classnames";
import { Header, Icon } from "react-native-elements";
import axios from "axios";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { WebView } from "react-native-webview";

let customFonts = {
  "Rubik-Black": require("../assets/fonts/Rubik-Black.ttf"),
  "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
  "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
  "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
  "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
  "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
  "Rubik-MediumItalic": require("../assets/fonts/Rubik-MediumItalic.ttf"),
  "Rubik-Italic": require("../assets/fonts/Rubik-Italic.ttf"),
  "Rubik-LightItalic": require("../assets/fonts/Rubik-LightItalic.ttf"),
  "Rubik-BlackItalic": require("../assets/fonts/Rubik-BlackItalic.ttf"),
  "Rubik-BoldItalic": require("../assets/fonts/Rubik-BoldItalic.ttf"),
  "Rubik-ExtraBoldItalic": require("../assets/fonts/Rubik-ExtraBoldItalic.ttf"),
  "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
};

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      articleDetails: {},
      fontsLoaded: false,
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  componentDidMount() {
    this._loadFontsAsync();
    this.getArticle();
  }
  getArticle = () => {
    const url = "http://b9f0-175-110-169-3.ngrok.io/get-article";
    axios
      .get(url)
      .then((res) => {
        this.setState({
          articleDetails: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  likedArticle = () => {
    const url = "http://b9f0-175-110-169-3.ngrok.io/liked-article";
    axios
      .post(url)
      .then((response) => {
        this.getArticle();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  unlikedArticle = () => {
    const url = "http://b9f0-175-110-169-3.ngrok.io/unliked-article";
    axios
      .post(url)
      .then((response) => {
        this.getArticle();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  render() {
    const { articleDetails } = this.state;
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    }
    if (articleDetails.title) {
      return (
        <View style={styles.container}>
          <Header
            centerComponent={{
              text: "Articles",
              style: {
                color: "#fff",
                fontSize: 20,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",

                fontFamily: "Rubik-Bold",
              },
            }}
            rightComponent={{
              icon: "search",
              color: "#fff",
            }}
            containerStyle={{
              backgroundColor: "#262636",
            }}
          />
          <View style={styles.webviewContainer}>
            <WebView
              source={{
                uri: articleDetails.url,
              }}
              style={{ borderRadius: 50 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",

              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#F3F3FA",
                width: 70,
                height: 70,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                alignSelf: "center",
                borderRadius: 100,
                marginRight: 60,
                elevation: 10,
                shadowColor: "#fff",
                shadowOffset: {
                  width: 2,
                  height: 2,
                },
                shadowOpacity: 1,
                shadowRadius: 3.84,
              }}
              onPress={this.likedArticle}
            >
              <Icon
                color={"#262636"}
                name={"thumbs-up"}
                type={"font-awesome"}
                size={25}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#F3F3FA",
                width: 70,
                height: 70,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                alignSelf: "center",
                borderRadius: 100,
                elevation: 10,
                shadowColor: "#fff",
                shadowOffset: {
                  width: 2,
                  height: 2,
                },
                shadowOpacity: 1,
                shadowRadius: 3.84,
              }}
              onPress={this.unlikedArticle}
            >
              <Icon
                color={"#262636"}
                name={"thumbs-down"}
                type={"font-awesome"}
                size={25}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  webviewContainer: {
    height: "75%",
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 50,
  },
  container: {
    backgroundColor: "#262636",
    height: "100%",
  },
});
