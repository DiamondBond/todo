import * as React from "react";
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from "react-native";

import { Text, View } from "../components/Themed";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import { useEffect } from "react";

interface ToDo {
  text: string;
  desc: string;
  completed: boolean;
}

const { width, height } = Dimensions.get("window");

export default function TabOneScreen(props: any) {
  // Modal State Management
  const [modalShown, setModalShown] = React.useState(false);
  const showModal = () => {
    setModalShown(true);
  };
  const hideModal = () => {
    setModalShown(false);
  };

  // Username Modal
  const [usernameModalShown, setUsernameModalShown] = React.useState(false);
  const [valueUsername, setValueUsername] = useState<string>("");
  const [usernameError, showUsernameError] = useState<Boolean>(false);

  const showUsernameModal = () => {
    setUsernameModalShown(true);
  };
  const hideUsernameModal = () => {
    setUsernameModalShown(false);
  };

  const handleUsernameSubmit = (): void => {
    setUsername(valueUsername);
    hideUsernameModal();
  };

  // Description
  const [valueDesc, setValueDesc] = useState<string>("");
  const [DescError, showDescError] = useState<Boolean>(false);

  // TODO List State Management
  const [value, setValue] = useState<string>("");
  const [toDoList, setToDos] = useState<ToDo[]>([]);
  const [error, showError] = useState<Boolean>(false);

  const [username, setUsername] = useState<string>("User");

  const handleSubmit = (): void => {
    if (value.trim())
      setToDos([
        ...toDoList,
        { text: value, desc: valueDesc, completed: false },
      ]);
    else showError(true);
    setValue("");
    setValueDesc("");
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

  const InitUsername = () => {
    showUsernameModal();
  };

  useEffect(() => {
    InitUsername;
  }, []);

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
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text>{`\n`}</Text>
              <Text>{`\n`}</Text>
              <TextInput
                placeholder="Title"
                value={value}
                onChangeText={(e) => {
                  setValue(e);
                  showError(false);
                }}
                autoFocus={true}
                multiline={true}
                style={styles.inputBox}
              />
              <Text></Text>
              <TextInput
                placeholder="Description"
                value={valueDesc}
                onChangeText={(e) => {
                  setValueDesc(e);
                  showDescError(false);
                }}
                autoFocus={false}
                multiline={true}
                style={styles.inputBox}
              />
              <Text>{`\n`}</Text>
              <TouchableOpacity
                style={{
                  height: 60,
                  width: 180,
                  borderRadius: 15,
                  backgroundColor: "#c0aed3",
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

      {/* Username Input */}
      <Modal
        visible={usernameModalShown}
        animationType="slide"
        hardwareAccelerated={true} // WARNING: UNSURE IF THIS IS SAFE.
        transparent={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{ position: "absolute", right: 15, top: 10 }}
              onPress={() => {
                hideUsernameModal();
              }}
            >
              <FontAwesome name="close" color="gray" size={22} />
            </TouchableOpacity>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text>{`\n`}</Text>
              <Text>{`\n`}</Text>
              <TextInput
                placeholder="Username"
                value={valueUsername}
                onChangeText={(e) => {
                  setValueUsername(e);
                  showUsernameError(false);
                }}
                autoFocus={true}
                multiline={false}
                style={styles.inputBox}
              />
              <Text>{`\n`}</Text>
              <TouchableOpacity
                style={{
                  height: 60,
                  width: 180,
                  borderRadius: 15,
                  backgroundColor: "#c0aed3",
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
                  handleUsernameSubmit();
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
                >
                  Set
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
      <View
        style={{
          flexDirection: "row",
          marginTop: "5%",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              color: "#cbbcdb",
            }}
          >
            Hello,
          </Text>
          <TouchableWithoutFeedback onPress={InitUsername}>
            <Text
              style={{
                fontSize: 40,
                fontWeight: "bold",
                color: "#9678b6",
              }}
            >
              {username}
            </Text>
          </TouchableWithoutFeedback>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            flexDirection: "row",
            marginLeft: 100,
          }}
        >
          <Image
            style={{
              width: 75,
              height: 75,
              borderRadius: 75,
              overflow: "hidden",
              borderWidth: 0,
              borderColor: "white",
            }}
            source={require("../assets/images/user.png")}
          />
        </View>
      </View>

      {/* TASK LIST */}
      <View style={{ marginTop: 25 }}>
        <Text style={styles.subtitle}>Tasks</Text>
      </View>

      <ScrollView style={{ height: (height * 1) / 2.5 }}>
        {toDoList.length === 0 && (
          <Text style={{ fontSize: 24 }}>Nothing To Do.</Text>
        )}
        {toDoList.map((toDo: ToDo, index: number) => (
          <View style={styles.listItem} key={`${index}_${toDo.text}`}>
            <View>
              <Text
                style={[
                  styles.task,
                  {
                    textDecorationLine: toDo.completed
                      ? "line-through"
                      : "none",
                    fontSize: 22,
                    // color: "#ab93c5",
                    backgroundColor: "#f9fafc",
                    fontWeight: "bold",
                    fontStyle: toDo.completed ? "italic" : "normal",
                  },
                ]}
              >
                {toDo.text}
              </Text>
              <Text
                style={[
                  styles.task,
                  {
                    textDecorationLine: toDo.completed
                      ? "line-through"
                      : "none",
                    fontSize: 20,
                    backgroundColor: "#f9fafc",
                    fontWeight: "normal",
                    fontStyle: toDo.completed ? "italic" : "normal",
                  },
                ]}
              >
                {toDo.desc}
              </Text>
            </View>

            {/* DELETE TASK */}
            <TouchableOpacity
              style={[
                styles.touchableStyle,
                {
                  backgroundColor: "#ab93c5",
                },
              ]}
              onPress={() => {
                removeItem(index);
              }}
            >
              <Ionicons name="arrow-forward-sharp" color="white" size={22} />
            </TouchableOpacity>

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
                  <Feather name="check" color="white" size={22} />
                ) : null}
              </Text>
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
            backgroundColor: "#c0aed3",
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
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputBox: {
    width: 200,
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
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 30,
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
    backgroundColor: "#ffffff",
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
    backgroundColor: "#9678b6",
  },
  unselected: {
    backgroundColor: "#ffffff",
  },
  touchableStyle: {
    height: 30,
    width: 30,
    borderRadius: 30,
    borderColor: "#dcdcdc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,

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
