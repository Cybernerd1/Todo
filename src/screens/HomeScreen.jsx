import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import useTodos from "../hooks/useTodos";
import TodoItem from "../components/TodoItem";

export default function HomeScreen({ onLogout }) {
  const { todos, loading, addTodo, deleteTodo, toggleComplete, editTodo } =
    useTodos();
  const [task, setTask] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Todo List</Text>
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Enter task..."
          value={task}
          onChangeText={setTask}
        />

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            addTodo(task);
            setTask("");
          }}
        >
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onToggle={() => toggleComplete(item._id)}
            onDelete={() => deleteTodo(item._id)}
            onEdit={(text) => editTodo(item._id, text)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  title: { fontSize: 28 },
  logout: { fontSize: 16, color: "red" },
  row: { flexDirection: "row", marginBottom: 15 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    height: 45,
    borderRadius: 6,
  },
  addBtn: {
    backgroundColor: "black",
    paddingHorizontal: 15,
    justifyContent: "center",
    marginLeft: 10,
    borderRadius: 6,
  },
  addText: { color: "white", fontWeight: "bold" },
});
