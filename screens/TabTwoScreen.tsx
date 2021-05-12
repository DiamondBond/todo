import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello :)</Text>
      <Text>{`\n`}This was created for a React Native Screening Test offered by CabbageApps.</Text>
      <Text>Time: 3-5 hours.</Text>
      <Text>{`\n`}Further improvements could include:</Text>
      <Text> - Redux Global States Management</Text>
      <Text> - Modal Card View for New Task</Text>
      <Text> - More Modularization</Text>
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
