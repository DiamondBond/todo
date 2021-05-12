import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello :)</Text>
      <Text>This app was created for a React Native Test by CabbageApps.</Text>
      <Text>A time constraint of 3-5 hours was specified.</Text>
      <Text>{`\n`}Further improvements could include:</Text>
      <Text> - Redux Global States Management</Text>
      <Text> - Modal Card View for New Task</Text>
      <Text> - Further modularization</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
