import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import {
  createMaterialTopTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import Constants from "expo-constants";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import { white, purple } from "./utils/colors";

function DecksStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
      )
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      )
    }
  }
};

const navigationOptions = {
  tabBarOptions: {
    activeTintColor: white,
    style: {
      height: 56,
      backgroundColor: purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const TabNav = createAppContainer(
  createMaterialTopTabNavigator(Tabs, navigationOptions)
);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <DecksStatusBar backgroundColor={purple} barStyle="light-content" />
        <TabNav />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
