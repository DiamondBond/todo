import * as React from "react";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";

import { Text, View } from "../components/Themed";
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface ToDo {
  text: string;
  completed: boolean;
}

export default function TabOneScreen() {
  const [value, setValue] = useState<string>("");
  const [toDoList, setToDos] = useState<ToDo[]>([]);
  const [error, showError] = useState<Boolean>(false);

  const [modalShown, setModalShown] = useState<boolean>(false);

  const handleSubmit = (): void => {
    if (value.trim())
      setToDos([...toDoList, { text: value, completed: false }]);
    else showError(true);
    setValue("");
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

  const showModal = () => {
    setModalShown(true);
  };
  const hideModal = () => {
    setModalShown(false);
  };

  return (
    <View style={styles.container}>
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
      <Text>{`\n`}</Text>
      <Text>{`\n`}</Text>
      {/* SPACER */}

      <Text style={styles.subtitle}>Tasks</Text>
      {toDoList.length === 0 && <Text>No to do task available</Text>}
      {toDoList.map((toDo: ToDo, index: number) => (
        <View style={styles.listItem} key={`${index}_${toDo.text}`}>
          <Text
            style={[
              styles.task,
              {
                textDecorationLine: toDo.completed ? "line-through" : "none",
              },
            ]}
          >
            {toDo.text}
          </Text>
          <Button
            title={toDo.completed ? "Completed" : "Complete"}
            onPress={() => toggleComplete(index)}
          />
          <Button
            title="X"
            onPress={() => {
              removeItem(index);
            }}
            color="crimson"
          />
        </View>
      ))}

      <Modal
        visible={modalShown}
        animationType="slide"
        hardwareAccelerated={true} // WARNING: UNSURE IF THIS IS SAFE.
        transparent={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{ position: "absolute", right: 20, top: 10 }}
              onPress={() => {
                hideModal();
              }}
            >
              <FontAwesome name="close" color="gray" size={22} />
            </TouchableOpacity>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Enter your todo task..."
                value={value}
                onChangeText={(e) => {
                  setValue(e);
                  showError(false);
                }}
                style={styles.inputBox}
              />
              <Button title="Add Task" onPress={handleSubmit} />
            </View>
            {error && (
              <Text style={styles.error}>Error: Input field is empty...</Text>
            )}
          </View>
        </View>
      </Modal>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    width: 200,
    borderColor: "purple",
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 8,
  },
  title: {
    fontSize: 40,
    marginBottom: 40,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "gray",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 40,
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
    marginBottom: 36,
  },
});
