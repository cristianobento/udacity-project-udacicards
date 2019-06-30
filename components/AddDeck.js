import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class AddDeck extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>ADD DECK</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 30,
    textAlign: "center"
  }
});

export default AddDeck;
