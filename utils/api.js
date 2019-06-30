import { AsyncStorage } from "react-native";

const DECK_STORAGE_KEY = "flashcards:decks";
const CARD_STORAGE_KEY = "flashcards:cards";

let data = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces"
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event"
      }
    ]
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared."
      }
    ]
  }
};

export function fetchDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    return results === null
      ? AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
      : JSON.parse(results);
  });
}
