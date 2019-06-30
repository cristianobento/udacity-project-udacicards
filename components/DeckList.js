import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { AppLoading } from "expo";
import { receiveDecks } from "../actions";
import { fetchDecks } from "../utils/api";

class DeckList extends Component {
  state = {
    ready: false
  };

  componentDidMount() {
    const { dispatch } = this.props;
    fetchDecks()
      .then(entries => dispatch(receiveDecks(entries)))
      .then(() => this.setState(() => ({ ready: true })));
  }

  goToDeck(key, count) {
    this.props.navigation.navigate("Deck", {
      deckTitle: key,
      cardsCount: count
    });
  }

  render() {
    const { ready } = this.state;

    let keyList = [];
    let titleCount = {};
    countCards = 0;

    Object.keys(this.props.entries).forEach(key => {
      keyList.push({ key: key });
    });

    Object.values(this.props.entries).map(topic => {
      titleCount[topic.title] = topic.questions.length;
    });

    if (ready === false) {
      return <AppLoading />;
    }

    return (
      <FlatList
        data={keyList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => this.goToDeck(item, titleCount[item.key])}
          >
            <View style={styles.decklist}>
              <Text style={styles.text}>{item.key}</Text>
              <Text style={styles.cardNumber}>
                cards {titleCount[item.key]}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
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
  },
  decklist: {
    margin: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#CED0CE"
  },
  cardNumber: {
    textAlign: "center",
    color: "#CED0CE"
  }
});

function mapStateToProps(entries) {
  return {
    entries
  };
}

export default connect(mapStateToProps)(DeckList);
