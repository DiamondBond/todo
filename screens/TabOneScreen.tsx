import * as React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Text, View } from "../components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface ToDo {
  text: string;
  completed: boolean;
}

export default function TabOneScreen(props: any) {
  // Modal State Management
  const [modalShown, setModalShown] = React.useState(false);
  const showModal = () => {
    setModalShown(true);
  };
  const hideModal = () => {
    setModalShown(false);
  };

  // TODO List State Management
  const [value, setValue] = useState<string>("");
  const [toDoList, setToDos] = useState<ToDo[]>([]);
  const [error, showError] = useState<Boolean>(false);

  const handleSubmit = (): void => {
    if (value.trim())
      setToDos([...toDoList, { text: value, completed: false }]);
    else showError(true);
    setValue("");
    hideModal();
  };

  const removeItem = (index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList.splice(index, 1);
    setToDos(newToDoList);
  };

  const toggleComplete = (index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList[index].completed = !newToDoList[index].completed;
    setToDos(newToDoList);
  };

  return (
    <View style={styles.container}>
      {/* MODAL */}
      <Modal
        visible={modalShown}
        animationType="slide"
        hardwareAccelerated={true} // WARNING: UNSURE IF THIS IS SAFE.
        transparent={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{ position: "absolute", right: 15, top: 10 }}
              onPress={() => {
                hideModal();
              }}
            >
              <FontAwesome name="close" color="gray" size={22} />
            </TouchableOpacity>
            {/* <View style={styles.inputWrapper}> */}
            <View>
              <Text>{`\n`}</Text>
              <Text>{`\n`}</Text>
              <TextInput
                placeholder="Task Title"
                value={value}
                onChangeText={(e) => {
                  setValue(e);
                  showError(false);
                }}
                autoFocus={true}
                multiline={true}
                style={styles.inputBox}
              />
              <Text>{`\n`}</Text>
              <TouchableOpacity
                style={{
                  height: 60,
                  width: 400,
                  borderRadius: 15,
                  backgroundColor: "#fd93a1",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 5,
                  marginBottom: 5,

                  // Shadows
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3,
                  elevation: 5,
                }}
                onPress={() => {
                  handleSubmit();
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
                >
                  Add Task
                </Text>
              </TouchableOpacity>
            </View>
            {error && (
              <Text style={styles.error}>Error: Input field is empty...</Text>
            )}
            <Text>{`\n`}</Text>
            <Text>{`\n`}</Text>
          </View>
        </View>
      </Modal>

      {/* HEADER */}
      <View style={{ flexDirection: "row", marginTop: "5%" }}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            color: "gray",
          }}
        >
          Hello,
        </Text>
        <Image
          style={{
            width: 75,
            height: 75,
            borderRadius: 75,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "white",
            marginLeft: "60%",
            justifyContent: "space-between",
          }}
          source={require("../assets/images/user.png")}
        />
      </View>
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          color: "black",
        }}
      >
        Abdur Rahman
      </Text>

      {/* SPACER */}
      <Text>{`\n`}</Text>
      <Text>{`\n`}</Text>
      {/* SPACER */}

      {/* TASK LIST */}
      <ScrollView>
        <Text style={styles.subtitle}>Tasks</Text>
        {toDoList.length === 0 && (
          <Text style={{ fontSize: 24 }}>Nothing To Do.</Text>
        )}
        {toDoList.map((toDo: ToDo, index: number) => (
          <View style={styles.listItem} key={`${index}_${toDo.text}`}>
            <Text
              style={[
                styles.task,
                {
                  textDecorationLine: toDo.completed ? "line-through" : "none",
                  fontSize: 22,
                  fontWeight: "normal",
                  fontStyle: toDo.completed ? "italic" : "normal",
                },
              ]}
            >
              {toDo.text}
            </Text>

            {/* TOGGLE TASK */}
            <TouchableOpacity
              style={[
                styles.touchableStyle,
                toDo.completed ? styles.selected : styles.unselected,
              ]}
              onPress={() => {
                toggleComplete(index);
              }}
            >
              <Text style={{ color: "white" }}>
                {toDo.completed ? (
                  <Feather name="check" color="white" size={24} />
                ) : null}
              </Text>
            </TouchableOpacity>

            {/* DELETE TASK */}
            <TouchableOpacity
              style={[
                styles.touchableStyle,
                {
                  backgroundColor: "#fd93a1",
                },
              ]}
              onPress={() => {
                removeItem(index);
              }}
            >
              <Feather name="x" color="white" size={24} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
      >
        <TouchableOpacity
          style={{
            height: 60,
            width: 60,
            borderRadius: 15,
            backgroundColor: "#fd93a1",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
            marginBottom: 5,

            // Shadows
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3,
            elevation: 5,
          }}
          onPress={() => {
            showModal();
          }}
        >
          <FontAwesome name="plus" color="white" size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    //alignItems: "center",
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputBox: {
    width: 400,
    height: 80,
    borderColor: "#eee",
    backgroundColor: "#f7f8fa",
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 32,
    paddingRight: 8,
    padding: 8,
  },
  title: {
    fontSize: 40,
    marginBottom: 40,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  subtitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "gray",
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    width: "92.5%",
    backgroundColor: "#f9fafc",
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  addButton: {
    alignItems: "flex-end",
  },
  task: {
    width: 200,
  },
  error: {
    color: "red",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    // marginTop: 12,
    // marginBottom: 12,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "white",
  },
  centeredView: {
    alignItems: "center",
    marginTop: 0,
    marginBottom: 0,
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    width: "93%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnImg: {
    width: 24,
    height: 26,
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  btnText: {
    color: "white",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 25,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  selected: {
    backgroundColor: "#5a3ea4",
  },
  unselected: {
    backgroundColor: "#ffffff",
  },
  touchableStyle: {
    height: 40,
    width: 40,
    borderRadius: 30,
    borderColor: "#dcdcdc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",

    // Shadows
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
});
