import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import AppText from "../components/AppText";
import colors from "../config/colors";

function ListItem({
  title,
  subTitle,
  onPress,
  renderRightActions,
  swipeableRef,
  style,
  listContent,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions} ref={swipeableRef}>
      <TouchableHighlight
        onPress={() => onPress}
        underlayColor={colors.primary}
      >
        <View style={styles.container}>
          <View style={[styles.text, style]}>{listContent}</View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    width: "100%",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  title: {
    fontWeight: "500",
    color: colors.blue_light,
  },
  subTitle: {
    color: colors.cyan,
    flexWrap: "wrap",
  },
  text: {
    flex: 1,
    width: "80%",
    padding: 5,
  },
});
export default ListItem;
