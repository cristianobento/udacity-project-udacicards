import React, { Component } from "react";
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
import { addDeck } from "../actions";
import { submitDeck } from "../utils/api";
import { connect } from "react-redux";

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={onPress}>
      <Text style={styles.submitBtnText}>Create Deck</Text>
    </TouchableOpacity>
  );
}

class AddDeck extends Component {
  state = {
    deckName: ""
  };

  handleTextChange = deckName => {
    this.setState(() => ({
      deckName
    }));
  };

  submit = () => {
    const deckName = this.state;

    const newDeck = {
      [deckName.deckName]: { title: deckName.deckName, questions: [] }
    };

    this.props.dispatch(addDeck(newDeck));
    submitDeck(newDeck);

    this.setState(() => ({
      deckName: ""
    }));

    const key = { key: deckName.deckName };
    const count = 0;

    this.props.navigation.navigate("Deck", {
      deckTitle: key,
      cardsCount: count
    });
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.box}>
          <Text style={{ fontSize: 36, textAlign: "center" }}>
            What is the title of your new deck
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Deck name"
            value={this.state.deckName}
            style={styles.textInput}
            onChangeText={text => this.setState({ deckName: text })}
          />
        </View>
        <View style={([styles.box], { flex: 2 })}>
          <SubmitBtn onPress={this.submit} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1
  },
  submitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    height: 45,
    textAlign: "center",
    justifyContent: "center"
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    margin: 10,
    paddingLeft: 6,
    borderColor: "gray",
    borderWidth: 1
  },
  box: {
    flex: 2,
    width: "100%",
    height: "40%",
    marginTop: 20,
    margin: 10
  }
});
export default connect()(AddDeck);
