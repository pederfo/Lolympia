import React, { useRef, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import ListItem from "../components/ListItem";
import ListItemSeperator from "../components/ListItemSeperator";

const resultList = [
  { name: "Sofie", place: "1", id: 1 },
  { name: "Peder", place: "2", id: 2 },
  { name: "Otto", place: "3", id: 3 },
  { name: "Plopp", place: "4", id: 4 },
  { name: "Plim", place: "5", id: 5 },
  { name: "Jimbo", place: "6", id: 6 },
  { name: "Sumo", place: "7", id: 7 },
  { name: "Kjus", place: "8", id: 8 },
  { name: "Soffe", place: "9", id: 9 },
  { name: "Fjas", place: "10", id: 10 },
  { name: "Gomm", place: "11", id: 11 },
];

export default function resultScreen(props) {
  const swipeableRef = useRef(null);
  const flatListRef = useRef();
  const [refreshing, setRefreshing] = useState(false);
  const [results, setResults] = useState(resultList);
  return (
    <Screen>
      <View style={styles.container}>
        <AppText style={styles.header}>R E S U L T A T E R</AppText>
        <View style={styles.year}>
          <AppText style={styles.yearText}>2 0 2 1</AppText>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={resultList}
            keyExtractor={(resultList) => resultList.id}
            renderItem={({ item }) => (
              <ListItem
                title={item.name}
                swipeableRef={swipeableRef}
                subTitle={item.place}
                onPress={() => console.log("Pressed", item)}
                style={styles.text}
                listContent={
                  <>
                    <View style={styles.row}>
                      <AppText style={styles.title}>{item.name}</AppText>
                      <AppText style={styles.subTitle}>{item.place}</AppText>
                    </View>
                  </>
                }
              />
            )}
            ItemSeparatorComponent={ListItemSeperator}
            refreshing={refreshing}
            onRefresh={() => {
              setResults(resultList);
            }}
            ref={flatListRef}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  header: {
    fontSize: 30,
    color: colors.purple_fog,
  },
  listContainer: {
    width: "100%",
    marginBottom: 150,
  },
  text: {
    flexDirection: "row",
  },
  title: {
    fontWeight: "500",
    color: colors.blue_light,
  },
  subTitle: {
    color: colors.cyan,
    flexWrap: "wrap",
  },
  row: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },
  year: {
    marginBottom: 20,
  },
});
