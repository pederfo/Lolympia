import React, { useState, useEffect } from "react";
import {
  GiftedChat,
  InputToolbar,
  Composer,
  Bubble,
  Send,
} from "react-native-gifted-chat";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { db } from "../config/firebaseSDK";
import { View, StyleSheet, Platform } from "react-native";
import colors from "../config/colors";
import randomNames from "./randomNames";
import transformToRobberLang from "./transformToRobberLang.js";

const chatRef = db.collection("chat");

function Chat() {
  const [user, setUser] = useState({
    _id: Math.random().toString(36).substring(7),
    name: randomNames(),
  });
  const [messages, setMessages] = useState([]);

  const updateChat = () => {
    const unsubscribe = chatRef
      .orderBy("createdAt", "desc")
      .limit(20)
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );
    return unsubscribe;
  };

  useEffect(() => {
    return updateChat();
  }, []);

  const handleRobberLang = (ctx, message) => {
    message.text = transformToRobberLang(message.text);
    chatRef
      .where("_id", "==", message._id)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (document) {
          document.ref.update({ text: message.text });
        });
      });
    return updateChat();
  };

  async function handleSend(messages) {
    const writes = messages.map((m) => chatRef.add(m));
    await Promise.all(writes);
  }

  return (
    <View style={{ backgroundColor: colors.primary, flex: 1 }}>
      <GiftedChat
        messages={messages}
        user={user}
        onLongPress={(ctx, currentMessage) =>
          handleRobberLang(ctx, currentMessage)
        }
        onSend={(messages) => handleSend(messages)}
        placeholder="..."
        renderUsernameOnMessage={true}
        renderAvatar={null}
        renderChatFooter={() => <View style={{ height: 100 }} />}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: colors.secondary,
              borderTopColor: colors.blue_light,
              height: 100,
            }}
            renderComposer={(props1) => (
              <Composer
                {...props1}
                textInputStyle={styles.inputTextStyle}
                textInputProps={{
                  autoCorrect: false,
                  autoCapitalize: "none",
                  textAlignVertical: "top",
                }}
              />
            )}
          />
        )}
        renderSend={(props) => {
          return (
            <Send {...props}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 40,
                  marginRight: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="send"
                  size={35}
                  color={colors.cyan}
                />
              </View>
            </Send>
          );
        }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{
                left: {
                  color: colors.cyan,
                  fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
                },
                right: {
                  color: colors.cyan,
                  fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: colors.primary,
                },
                right: {
                  backgroundColor: colors.primary,
                },
              }}
            />
          );
        }}
      />
    </View>
  );
}

export default Chat;

const styles = StyleSheet.create({
  nameInput: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 15,
    marginBottom: 20,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    flex: 1,
  },
  inputContainerStyle: {
    backgroundColor: colors.secondary,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 100,
    padding: 5,
  },
  inputTextStyle: {
    color: colors.cyan,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});
