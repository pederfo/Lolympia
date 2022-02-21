import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "./AppText";

export default function resultList({}) {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <AppText>Hallo</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    width: "100%",
  },
  text: {
    flex: 1,
    width: "80%",
    padding: 5,
  },
});
