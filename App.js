import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "React Native Chatbot",
  avatar: "https://loremflickr.com/140/140",
};

export default function App() {
  const [messages, setMessages] = useState([]);

  const questions = [
    {
      question1: "What's the first name of Snap's CEO?",
      answer: "Evan",
      correct: "You are correct",
      incorrect: "Nope! try again",
    },
    {
      question1: "How do you spell the name of this chatbot creator?",
      answer: "Khanh",
      correct: "You are correct",
      incorrect: "This is very dissapointing. Try again.",
    },
    {
      question1: "What 1 + 1?",
      answer: "2",
      correct: "You are correct",
      incorrect: "Nope!",
    }
    ,
    {
      question1: "What's 2 + 2?",
      answer: "4",
      correct: "You are correct",
      incorrect: "Nope! try again",
    }
    
  ]

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello, welcome to simple trivia! Say 'Yes' when you're ready to play!",
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  }, []);

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      // console.log("PREVIOUS MESSAGES:", previousMessages);
      // console.log("NEW MESSAGE:", newMessages);
      return GiftedChat.append(previousMessages, newMessages);
    });
  };

  const addBotMessage = (text) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  };

  //var index = 0;
  const [index, setIndex] = useState(0);
  //var gameStarted = false;
  const [gameStarted, setGameStarted] = useState(false)
  const [output, setOutput] = useState("Ok let's play! Press any character to start")
  //var questionPrompted = false
  const [questionPrompted, setQuestionPrompted] = useState(false)


  const respondToUser = (userMessages) => {
    console.log("User message text:", userMessages[0].text);

    // Simple chatbot logic (aka Checkpoint 2 onwards) here!

    if(gameStarted == false)
    {
      if(userMessages[0].text == "Yes") {
        addBotMessage(output)
        setGameStarted(true)
      }
      else {
        addBotMessage("Please say 'yes' to start.")
      }
    }
    else if(gameStarted == true)
    { 
      askQuestions(userMessages)
    }
  };

  const askQuestions = (userMessages) => {
    if(questionPrompted == false && index < 3)
    {
      addBotMessage(questions[index].question1)
      setQuestionPrompted(true)
    }
    else if(userMessages[0].text == questions[index].answer && index < 3)
    {
      addBotMessage("Correct! Next Question! Press any character to continue")
      setIndex(index+1)
      console.log("index: " ,index)
      setQuestionPrompted(false)
    }
    else if(index < 3)
    {
      addBotMessage(questions[index].incorrect)
    }

    if(index == 3)
    {
      addBotMessage("You win! Do you want to play again?")
      setIndex(0)
      setGameStarted(false)
    }
  }


  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages)
        setTimeout(() => respondToUser(messages), 1000);
      }}
      user={{
        _id: 1,
        name: "Baker",
      }}
      renderUsernameOnMessage={true}
    />
  );
}
