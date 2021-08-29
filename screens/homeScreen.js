import React from "react";
import { StyleSheet, View, Image } from "react-native";

import colors from "../config/colors";
import Screen from "../components/Screen";
import AppText from "../components/AppText";

export default function HomeScreen() {
  return (
    <Screen style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={require("../assets/lolympicRings3.png")}
        />
      </View>
      <View style={styles.date}>
        <AppText>2 0 2 1</AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  date: {
    alignItems: "center",
  },
  logo: {
    height: "60%",
    width: "60%",
  },
  logoContainer: {
    alignItems: "center",
  },
});
