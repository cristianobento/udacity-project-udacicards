import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { white, red, green, black } from "../utils/colors";

class Quiz extends Component {
  state = {
    showOrHideAnswerState: false,
    showScore: 0,
    cardsRemaining: this.props.navigation.state.params.cardsCount - 1,
    cardsCount: this.props.navigation.state.params.cardsCount,
    correct: 0,
    incorrect: 0
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Quiz"
    };
  };

  showOrHideAnswer = () => {
    this.setState({
      showOrHideAnswerState: !this.state.showOrHideAnswerState
    });
  };

  handleCorrectAnswer = () => {
    if (this.state.cardsRemaining >= 0) {
      this.setState({
        correct: (this.state.correct += 1),
        cardsRemaining: (this.state.cardsRemaining -= 1)
      });

      if (this.state.cardsRemaining < 0) {
        this.setState({
          showScore: true
        });
      }
    }
  };

  handleWrongAnswer = () => {
    if (this.state.cardsRemaining >= 0) {
      this.setState({
        incorrect: (this.state.incorrect += 1),
        cardsRemaining: (this.state.cardsRemaining -= 1)
      });

      if (this.state.cardsRemaining < 0) {
        this.setState({
          showScore: true
        });
      }
    }
  };

  clearStateData = () => {
    this.setState({
      showOrHideAnswerState: false,
      showScore: 0,
      cardsRemaining: this.props.navigation.state.params.cardsCount - 1,
      correct: 0,
      incorrect: 0
    });
  };

  render() {
    const { questions } = this.props.navigation.state.params;
    const {
      showOrHideAnswerState,
      showScore,
      cardsRemaining,
      cardsCount
    } = this.state;
    const cardIndex =
      this.props.navigation.state.params.cardsCount - cardsRemaining - 1;
    return (
      <View style={styles.container}>
        {cardsCount > 0 ? (
          <View>
            {showScore ? (
              <View>
                <View style={{ height: 200 }}>
                  <Text style={styles.text}>
                    Correct questions: {this.state.correct}
                  </Text>
                  <Text style={styles.text}>
                    Incorrect questions: {this.state.incorrect}
                  </Text>
                </View>
                <View style={{ height: 80 }}>
                  <TouchableOpacity
                    style={styles.greenButton}
                    onPress={this.clearStateData}
                  >
                    <Text style={styles.greenButtonText}>Restart Quiz</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ height: 80 }}>
                  <TouchableOpacity
                    style={styles.redButton}
                    onPress={() => this.props.navigation.navigate("Deck")}
                  >
                    <Text style={styles.redButtonText}>Back to Deck</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 14 }}>
                  Questions remaining: {cardsRemaining}
                </Text>
                {showOrHideAnswerState ? (
                  <View>
                    <View style={{ height: 200, alignItems: "center" }}>
                      <Text style={styles.text}>
                        {questions[cardIndex].answer}
                      </Text>
                      <TouchableOpacity onPress={this.showOrHideAnswer}>
                        <Text style={{ color: red }}>Show Question</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View>
                    <View style={{ height: 200, alignItems: "center" }}>
                      <Text style={styles.text}>
                        {questions[cardIndex].question}
                      </Text>
                      <TouchableOpacity onPress={this.showOrHideAnswer}>
                        <Text style={{ color: red }}>Show Answer</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <View style={{ height: 100 }}>
                  <TouchableOpacity
                    style={styles.greenButton}
                    onPress={this.handleCorrectAnswer}
                  >
                    <Text style={styles.greenButtonText}>Correct</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ height: 100 }}>
                  <TouchableOpacity
                    style={styles.redButton}
                    onPress={this.handleWrongAnswer}
                  >
                    <Text style={styles.redButtonText}>Incorrect</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ) : (
          <Text style={styles.text}>
            Sorry you cannot take a quiz because there are no cards in the deck.
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center"
  },
  redButton: {
    backgroundColor: red,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 4,
    height: 45,
    textAlign: "center",
    justifyContent: "center"
  },
  greenButton: {
    backgroundColor: green,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 4,
    height: 45,
    textAlign: "center",
    borderWidth: 1,
    justifyContent: "center"
  },
  greenButtonText: {
    color: white,
    fontSize: 22,
    textAlign: "center",
    alignItems: "center"
  },
  redButtonText: {
    color: white,
    fontSize: 22,
    textAlign: "center",
    alignItems: "center"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    alignItems: "center"
  }
});

function mapStateToProps(entries) {
  return {
    entries
  };
}
export default connect(mapStateToProps)(Quiz);
