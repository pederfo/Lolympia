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

const content = [
  {
    isExpanded: false,
    category_name: "Item 1",
    subcategory: [{ id: 1, val: "Sub 1" }],
  },
  {
    isExpanded: false,
    category_name: "Item 2",
    subcategory: [
      { id: 2, val: "Sub 2" },
      { id: 3, val: "Sub 4" },
      { id: 4, val: "Sub 3" },
    ],
  },
  {
    isExpanded: false,
    category_name: "Item 3",
    subcategory: [
      { id: 5, val: "Sub 6" },
      { id: 6, val: "Sub 5" },
    ],
  },
];

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
        <Text style={styles.itemText}>{item.category_name}</Text>
      </TouchableOpacity>
      <View style={{ height: layoutHeight, overflow: "hidden" }}>
        {item.subcategory.map((item, key) => (
          <TouchableOpacity key={key} style={styles.content}>
            <Text style={styles.text}>
              {key}. {item.val}
            </Text>
            <View style={styles.separator} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const expandableList = () => {
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleText}>Expandable List View</Text>
          <TouchableOpacity onPress={() => setMultiSelect(!multiSelect)}>
            <Text style={styles.headerButton}>
              {multiSelect
                ? "Enable Single \n Expand"
                : "Enable Multiple \n Expand"}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
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
  header: {
    flexDirection: "row",
    padding: 10,
  },
  titleText: {
    fontSize: 22,
    flex: 1,
    fontWeight: "bold",
  },
  headerButton: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 18,
  },
  item: {
    backgroundColor: "orange",
    padding: 20,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
  },
  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#c8c8c8",
  },
  text: {
    fontSize: 16,
    paddingRight: 10,
  },
});

export default expandableList;
