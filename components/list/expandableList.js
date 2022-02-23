import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { color } from "react-native-reanimated";

import colors from "../../config/colors";
import AppText from "../AppText";

let content = [
  {
    isExpanded: false,
    category_name: "Otto",
    place: "1.",
    subcategory: [{ id: 1, gren: "Liten Stein", val: 4 }],
  },
  {
    isExpanded: false,
    category_name: "Sofie",
    place: "2.",
    subcategory: [
      { id: 2, gren: "Liten Stein", val: 8 },
      { id: 3, gren: "Stor Stein", val: 10 },
      { id: 4, gren: "Støvelkast", val: 3 },
    ],
  },
  {
    isExpanded: false,
    category_name: "Peder",
    place: "3.",
    subcategory: [
      { id: 5, gren: "Liten Stein", val: 20 },
      { id: 6, gren: "Støvelkast", val: 14 },
    ],
  },
];

const addScore = (item) => {
  item.score = item.subcategory.reduce((pre, cur) => {
    return pre + cur.val;
  }, 0);
  return item.score;
};

const rearrangeContent = (content) => {
  content.forEach((item) => addScore(item));
  content = content.sort((a, b) => b.score - a.score);
  return content;
};

const ExpandableComponent = ({ item, onClickFunction }) => {
  const [layoutHeight, setLayoutHeight] = useState(0);
  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View>
      <TouchableOpacity style={styles.item} onPress={onClickFunction}>
        <AppText style={styles.itemText}>
          {item.place}
          {item.category_name}
        </AppText>
        <AppText style={styles.itemText}>{item.score}</AppText>
      </TouchableOpacity>
      <View style={{ height: layoutHeight, overflow: "hidden" }}>
        {item.subcategory.map((item, key) => (
          <TouchableOpacity key={key} style={styles.content}>
            <View style={styles.contentContainer}>
              <AppText style={styles.text}>{item.gren}</AppText>
              <AppText style={styles.text}>{item.val}</AppText>
            </View>
            <View style={styles.separator} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const expandableList = () => {

  content = rearrangeContent(content);
  const [multiSelect, setMultiSelect] = useState(false);
  const [listDataSource, setlistDataSource] = useState(content);

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if (multiSelect) {
      // if multiple select is enabled, changes all isExpanded
      array[index]["isExpanded"] = !array[index]["isExpanded"];
    } else {
      // if single select is enabled, changes 1 isExpanded
      array.map((value, placeindex) => {
        placeindex === index
          ? (array[placeindex]["isExpanded"] = !array[placeindex]["isExpanded"])
          : (array[placeindex]["isExpanded"] = false);
      });
    }
    setlistDataSource(array);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
      <View style={styles.container}>
        <View style={styles.mode}>
          <TouchableOpacity onPress={() => setMultiSelect(!multiSelect)}>
            <AppText style={styles.headerButton}>
              {multiSelect
                ? "Disable \n Comparison Mode"
                : "Enable \n Comparison Mode"}
            </AppText>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <AppText style={styles.titleText}>RESULTATER</AppText>
        </View>
        <ScrollView style={styles.list}>
          {listDataSource.map((item, key) => (
            <ExpandableComponent
              key={item.category_name}
              item={item}
              onClickFunction={() => {
                updateLayout(key);
              }}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mode: {
    padding: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    padding: 10,
  },
  titleText: {
    fontSize: 25,
    flex: 1,
    letterSpacing: 4,
    color: colors.purple_fog,
  },
  headerButton: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 12,
    color: colors.purple_red,
  },
  list: {
    marginTop: 20,
    marginBottom: 40,
  },
  item: {
    backgroundColor: colors.primary,
    padding: 20,
    borderColor: colors.blue_dark,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    fontSize: 16,
    letterSpacing: 2,
  },
  content: {
    backgroundColor: colors.blue_dark,
    height: 50,
    justifyContent: "center",
  },
  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: 16,
    paddingRight: 10,
  },
  contentContainer: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default expandableList;
