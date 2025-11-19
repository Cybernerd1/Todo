import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

export default function TodoItem({ item, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={onToggle}>
        <Text style={styles.checkbox}>
          {item.completed ? "☑️" : "⬜"}
        </Text>
      </TouchableOpacity>

      {editing ? (
        <TextInput
          style={styles.input}
          value={editText}
          onChangeText={setEditText}
          onSubmitEditing={() => {
            onEdit(editText);
            setEditing(false);
          }}
        />
      ) : (
        <Text style={[styles.text, item.completed && styles.completed]}>
          {item.text}
        </Text>
      )}

      <TouchableOpacity onPress={() => setEditing(!editing)}>
        <Text style={styles.btn}>✏️</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.btn}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 6,
    marginBottom: 10,
    alignItems: "center",
  },
  checkbox: { fontSize: 22, marginRight: 10 },
  text: { flex: 1, fontSize: 16 },
  completed: { textDecorationLine: "line-through", color: "gray" },
  btn: { fontSize: 20, marginHorizontal: 6 },
  input: { flex: 1, borderBottomWidth: 1, fontSize: 16 },
});
