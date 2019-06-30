import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import { white, purple } from "../utils/colors";
import { addCard } from "../actions";
import { addCardToDeck } from "../utils/api";

function SubmitBtn({ onPress, props }) {
  return (
    <TouchableOpacity
      style={styles.androidSubmitBtn}
      onPress={() => onPress(props)}
    >
      <Text style={styles.submitBtnText}>ADD CARD</Text>
    </TouchableOpacity>
  );
}

class AddCard extends Component {

  state = {
    question: "",
    answer: ""
  };
  submit = props => {
    const { question, answer } = this.state;
    const { deckTitle } = props.navigation.state.params;
    this.props.dispatch(addCard(question, answer, deckTitle));
    addCardToDeck(question, answer, deckTitle);
    this.setState(() => ({
      question: "",
      answer: ""
    }));
  };
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Add Card"
    };
  };
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={([styles.box], { flex: 1 })}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Question"
            value={this.state.question}
            style={{
              height: 40,
              width: 300,
              paddingLeft: 6,
              borderColor: "gray",
              borderWidth: 1
            }}
            onChangeText={text => this.setState({ question: text })}
          />
        </View>
        <View style={([styles.box], { flex: 2 })}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Answer"
            value={this.state.answer}
            style={{
              height: 40,
              width: 300,
              paddingLeft: 6,
              borderColor: "gray",
              borderWidth: 1
            }}
            onChangeText={text => this.setState({ answer: text })}
          />
        </View>
        <View style={([styles.box], { flex: 3 })}>
          <SubmitBtn onPress={this.submit} props={this.props} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    margin: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    height: 45,
    justifyContent: "center",
    alignItems: "center"
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1
  },
  box: {
    width: "100%",
    height: "40%",
    marginTop: 20,
    backgroundColor: "#e76e63",
    margin: 10
  }
});

export default connect()(AddCard);
