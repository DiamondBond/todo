import * as React from "react";
import { Text, View } from "../components/Themed";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Button,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Navigation from "../navigation";
import SyncStorage from "sync-storage";

const { width, height } = Dimensions.get("window");

export default function TabTwoScreen(props: any) {
  const [username, setUsername] = useState<string>("User");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>
        {`\n`}
        {`\n`}
      </Text>
      <CalendarList
        style={{
          height: (height * 1) / 4,
          width: width - 100,
          resizeMode: "contain",
        }}
        // Specify theme properties to override specific styles for calendar parts. Default = {}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#9678b6",
          // textSectionTitleDisabledColor: "#d9e1e8",
          selectedDayBackgroundColor: "#9678b6",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#ffffff",
          todayBackgroundColor: "#9678b6",
          //dayTextColor: "#505050",
          //textDisabledColor: "#d9e1e8",
          dotColor: "#9678b6",
          //selectedDotColor: "#ffffff",
          arrowColor: "#ab93c5",
          //disabledArrowColor: "#d9e1e8",
          monthTextColor: "#9678b6",
          indicatorColor: "#9678b6",
          // textDayFontFamily: "monospace",
          // textMonthFontFamily: "monospace",
          // textDayHeaderFontFamily: "monospace",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
        onDayPress={(day: any) => {
          props.navigation.replace("TabTwoScreen");
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day: any) => {
          console.log("selected day", day);
        }}
      />
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
