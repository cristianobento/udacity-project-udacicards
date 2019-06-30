import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { white, black } from "../utils/colors";

function AddCardButton({ props }) {
  return (
    <TouchableOpacity
      style={styles.addCardButton}
      onPress={() =>
        props.navigation.navigate("AddCard", {
          deckTitle: props.navigation.state.params.deckTitle.key
        })
      }
    >
      <Text style={styles.addCardButtonText}>Add Card</Text>
    </TouchableOpacity>
  );
}

function StartQuizButton({ props, questions, count }) {

  return (
    <TouchableOpacity
      style={styles.addCardButton}
      onPress={() =>
        props.navigation.navigate("Quiz", {
          deckTitle: props.navigation.state.params.deckTitle.key,
          cardsCount: count,
          questions: questions
        })
      }
    >
      <Text style={styles.addCardButtonText}>Start Quiz</Text>
    </TouchableOpacity>
  );
}

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

    const questions =
      this.props.entries[deckTitle] && this.props.entries[deckTitle].questions;

    return (
      <View style={styles.container}>
        <View style={[styles.box]}>
          <Text style={styles.text}>{deckTitle}</Text>
          <Text style={styles.cardInfo}>cards {questionsLength}</Text>
        </View>
        <View style={([styles.box], { flex: 1 })}>
          <AddCardButton props={this.props} />
        </View>
        <View style={([styles.box], { flex: 1 })}>
          <StartQuizButton
            props={this.props}
            questions={questions}
            count={questionsLength}
          />
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
  addCardButton: {
    backgroundColor: white,
    padding: 10,
    paddingLeft: 30,
    borderColor: black,
    borderWidth: 1,
    borderRadius: 2,
    paddingRight: 30,
    height: 45,
    textAlign: "center",
    justifyContent: "center"
  },
  addCardButtonText: {
    color: black,
    fontSize: 22,
    textAlign: "center",
    alignItems: "center"
  },

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
