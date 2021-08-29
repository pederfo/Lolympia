import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../config/colors";
import AppText from "./AppText";

async function isLoggedIn() {
  const loggedInStatus = await AsyncStorage.getItem("@loggedIn");
  return JSON.parse(loggedInStatus);
}

function Login2({ navigation }) {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState("false");

  const onChangeTextPassword = (value) => setPassword(value);

  useEffect(() => {
    isLoggedIn().then((cachedStatus) => {
      if (cachedStatus === true) navigation.navigate("App");
    });
  }, []);

  async function setLoggedInStatus(status) {
    if (status === "true") await AsyncStorage.setItem("@loggedIn", "true");
    else {
      await AsyncStorage.setItem("@loggedIn", "false");
    }
    setLoggedIn(status);
  }

  function handlePress() {
    if (password.toLowerCase() === "jippi") {
      setLoggedInStatus("true");
      navigation.navigate("App");
    } else {
      alert("Feil passord");
      setLoggedInStatus("false");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Passord:</Text>
      </View>

      <TextInput
        style={styles.nameInput}
        onChangeText={onChangeTextPassword}
        value={password}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableHighlight
        style={styles.buttonContainer}
        activeOpacity={0.6}
        underlayColor={colors.primary}
        onPress={handlePress}
      >
        <AppText style={styles.buttonText}>Slipp meg inn</AppText>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    marginLeft: 16,
    fontSize: 16,
    color: colors.cyan,
  },
  titleContainer: {
    alignItems: "center",
  },
  nameInput: {
    height: 16 * 2,
    margin: 16,
    paddingHorizontal: 16,
    borderColor: colors.blue_dark,
    borderWidth: 1,
    fontSize: 16,
    width: "80%",
    color: colors.cyan,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.cyan,
    width: "50%",
    padding: 5,
    backgroundColor: colors.cyan,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
  },
});

export default Login2;
