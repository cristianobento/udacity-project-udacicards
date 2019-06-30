import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { white } from "../utils/colors";

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deckTitle.key
    };
  };

  render() {
    const deckTitle =
      this.props.navigation.state.params.deckTitle &&
      this.props.navigation.state.params.deckTitle.key;
    const questionsLength = this.props.entries[deckTitle].questions.length;

    return (
      <View style={styles.container}>
        <View style={[styles.box]}>
          <Text style={styles.text}>{deckTitle}</Text>
          <Text style={styles.cardInfo}>cards {questionsLength}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    justifyContent: "space-around",
    alignItems: "center"
  },
  box: {
    flex: 1,
    height: "40%",
    marginTop: 20,
    margin: 10
  },
  cardInfo: { textAlign: "center", fontSize: 18, color: "#CED0CE" },
  text: {
    fontSize: 30,
    textAlign: "center"
  }
});

function mapStateToProps(entries) {
  return {
    entries
  };
}

export default connect(mapStateToProps)(Deck);
