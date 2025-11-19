import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet,
  Animated 
} from "react-native";

// Custom Icon Components using Views and Text
const CheckboxIcon = ({ checked, size = 28 }) => (
  <View style={[
    styles.checkboxIcon, 
    { width: size, height: size, borderRadius: size * 0.25 },
    checked && styles.checkboxChecked
  ]}>
    {checked && (
      <Text style={[styles.checkmark, { fontSize: size * 0.6 }]}>✓</Text>
    )}
  </View>
);

const EditIcon = ({ size = 18, color = "#6366f1" }) => (
  <View style={{ width: size, height: size, justifyContent: "center", alignItems: "center" }}>
    <View style={[styles.pencilBody, { 
      width: size * 0.5, 
      height: size * 0.8, 
      backgroundColor: color,
      transform: [{ rotate: "45deg" }]
    }]} />
    <View style={[styles.pencilTip, { 
      width: 0,
      height: 0,
      borderLeftWidth: size * 0.25,
      borderRightWidth: size * 0.25,
      borderBottomWidth: size * 0.3,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: color,
      position: "absolute",
      top: -2,
      transform: [{ rotate: "45deg" }]
    }]} />
  </View>
);

const DeleteIcon = ({ size = 18, color = "#ef4444" }) => (
  <View style={{ width: size, height: size, justifyContent: "center", alignItems: "center" }}>
    <View style={[styles.trashCan, { 
      width: size * 0.7, 
      height: size * 0.8, 
      borderColor: color,
      borderBottomLeftRadius: size * 0.15,
      borderBottomRightRadius: size * 0.15,
    }]}>
      <View style={[styles.trashLine, { backgroundColor: color, width: size * 0.2 }]} />
    </View>
    <View style={[styles.trashLid, { 
      width: size * 0.8, 
      height: 3, 
      backgroundColor: color,
      top: 1,
    }]} />
  </View>
);

const SaveIcon = ({ size = 18 }) => (
  <View style={{ width: size, height: size, justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontSize: size, color: "#fff", fontWeight: "bold" }}>✓</Text>
  </View>
);

const CancelIcon = ({ size = 18 }) => (
  <View style={{ width: size, height: size, justifyContent: "center", alignItems: "center" }}>
    <View style={[styles.crossLine, { 
      width: size * 0.7, 
      height: 2, 
      backgroundColor: "#fff",
      transform: [{ rotate: "45deg" }]
    }]} />
    <View style={[styles.crossLine, { 
      width: size * 0.7, 
      height: 2, 
      backgroundColor: "#fff",
      transform: [{ rotate: "-45deg" }]
    }]} />
  </View>
);

export default function TodoItem({ item, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.97,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    onToggle();
  };

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(editText);
      setEditing(false);
    } else {
      setEditText(item.text);
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(item.text);
    setEditing(false);
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        { transform: [{ scale: scaleAnim }] },
        item.completed && styles.containerCompleted
      ]}
    >
      {/* Checkbox */}
      <TouchableOpacity 
        onPress={handlePress}
        style={styles.checkboxContainer}
        activeOpacity={0.7}
      >
        <CheckboxIcon checked={item.completed} size={28} />
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.contentContainer}>
        {editing ? (
          <View style={styles.editContainer}>
            <TextInput
              style={styles.input}
              value={editText}
              onChangeText={setEditText}
              autoFocus
              placeholderTextColor="#64748b"
              multiline
            />
          </View>
        ) : (
          <Text 
            style={[
              styles.text, 
              item.completed && styles.completedText
            ]}
            numberOfLines={3}
          >
            {item.text}
          </Text>
        )}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        {editing ? (
          <>
            <TouchableOpacity 
              onPress={handleEdit}
              style={[styles.actionBtn, styles.saveBtn]}
              activeOpacity={0.7}
            >
              <SaveIcon size={18} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleCancel}
              style={[styles.actionBtn, styles.cancelBtn]}
              activeOpacity={0.7}
            >
              <CancelIcon size={18} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity 
              onPress={() => setEditing(true)}
              style={[styles.actionBtn, styles.editBtn]}
              activeOpacity={0.7}
            >
              <Text style={styles.actionEmoji}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={onDelete}
              style={[styles.actionBtn, styles.deleteBtn]}
              activeOpacity={0.7}
            >
              <Text style={styles.actionEmoji}>🗑️</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#334155",
    minHeight: 70,
  },
  containerCompleted: {
    backgroundColor: "#0f172a",
    borderColor: "#1e293b",
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkboxIcon: {
    borderWidth: 2,
    borderColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "#6366f1",
    borderColor: "#6366f1",
  },
  checkmark: {
    color: "#fff",
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
  },
  editContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: "#f8fafc",
    lineHeight: 22,
  },
  completedText: {
    color: "#64748b",
    textDecorationLine: "line-through",
  },
  input: {
    fontSize: 16,
    color: "#f8fafc",
    borderBottomWidth: 2,
    borderBottomColor: "#6366f1",
    paddingVertical: 4,
    paddingHorizontal: 0,
    minHeight: 40,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginLeft: 12,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  actionEmoji: {
    fontSize: 18,
  },
  editBtn: {
    backgroundColor: "#312e8120",
  },
  deleteBtn: {
    backgroundColor: "#7f1d1d20",
  },
  saveBtn: {
    backgroundColor: "#10b981",
  },
  cancelBtn: {
    backgroundColor: "#64748b",
  },
  // Custom icon component styles
  pencilBody: {
    borderRadius: 2,
  },
  pencilTip: {
    position: "absolute",
  },
  trashCan: {
    borderWidth: 2,
    borderTopWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  trashLine: {
    height: 2,
    borderRadius: 1,
    marginTop: 4,
  },
  trashLid: {
    position: "absolute",
    borderRadius: 2,
  },
  crossLine: {
    position: "absolute",
    borderRadius: 1,
  },
});