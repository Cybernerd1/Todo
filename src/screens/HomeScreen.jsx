import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTodos from "../hooks/useTodos";
import TodoItem from "../components/TodoItem";

// Custom SVG-like icons using View components
const CheckCircleIcon = ({ size = 24, color = "#10b981" }) => (
  <View style={[styles.iconCircle, { width: size, height: size, borderColor: color }]}>
    <Text style={[styles.iconCheck, { color, fontSize: size * 0.6 }]}>✓</Text>
  </View>
);

const ListIcon = ({ size = 24, color = "#94a3b8" }) => (
  <View style={{ width: size, height: size, justifyContent: "center" }}>
    <View style={[styles.listLine, { backgroundColor: color, width: size * 0.8 }]} />
    <View style={[styles.listLine, { backgroundColor: color, width: size * 0.6, marginTop: 4 }]} />
    <View style={[styles.listLine, { backgroundColor: color, width: size * 0.7, marginTop: 4 }]} />
  </View>
);

const PlusIcon = ({ size = 28, color = "#fff" }) => (
  <View style={{ width: size, height: size, justifyContent: "center", alignItems: "center" }}>
    <View style={[styles.plusHorizontal, { width: size * 0.7, height: 3, backgroundColor: color }]} />
    <View style={[styles.plusVertical, { width: 3, height: size * 0.7, backgroundColor: color }]} />
  </View>
);

const LogoutIcon = ({ size = 20, color = "#ef4444" }) => (
  <View style={{ width: size, height: size, justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontSize: size, color }}>⎋</Text>
  </View>
);

const TrendingIcon = ({ size = 16, color = "#94a3b8" }) => (
  <View style={{ width: size, height: size }}>
    <Text style={{ fontSize: size, color }}>📈</Text>
  </View>
);

const ClipboardIcon = ({ size = 80, color = "#334155" }) => (
  <View style={[styles.clipboard, { width: size, height: size * 1.2, borderColor: color }]}>
    <View style={[styles.clipboardClip, { backgroundColor: color, width: size * 0.4 }]} />
    <View style={[styles.clipboardLine, { backgroundColor: color, width: size * 0.6, marginTop: size * 0.3 }]} />
    <View style={[styles.clipboardLine, { backgroundColor: color, width: size * 0.5, marginTop: size * 0.1 }]} />
    <View style={[styles.clipboardLine, { backgroundColor: color, width: size * 0.4, marginTop: size * 0.1 }]} />
  </View>
);

export default function HomeScreen({ onLogout }) {
  const { todos, loading, addTodo, deleteTodo, toggleComplete, editTodo } =
    useTodos();
  const [task, setTask] = useState("");

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleAddTask = () => {
    if (task.trim()) {
      addTodo(task);
      setTask("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.titleRow}>
            <View style={styles.appIcon}>
              <Text style={styles.appIconText}>✓</Text>
            </View>
            <Text style={styles.title}>My Tasks</Text>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statBadge}>
              <ListIcon size={16} color="#94a3b8" />
              <Text style={styles.statNumber}>{totalCount}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={[styles.statBadge, styles.statBadgeSuccess]}>
              <CheckCircleIcon size={16} color="#10b981" />
              <Text style={[styles.statNumber, styles.statNumberSuccess]}>{completedCount}</Text>
              <Text style={[styles.statLabel, styles.statLabelSuccess]}>Done</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
          <LogoutIcon size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      {totalCount > 0 && (
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <View style={styles.progressLabelRow}>
              <TrendingIcon size={16} color="#94a3b8" />
              <Text style={styles.progressText}>Progress</Text>
            </View>
            <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[styles.progressFill, { width: `${progress}%` }]} 
            />
          </View>
        </View>
      )}

      {/* Input Section */}
      <View style={styles.inputSection}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputIcon}>✍️</Text>
          <TextInput
            style={styles.input}
            placeholder="Add a new task..."
            placeholderTextColor="#64748b"
            value={task}
            onChangeText={setTask}
            onSubmitEditing={handleAddTask}
            returnKeyType="done"
          />
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={handleAddTask}
          activeOpacity={0.8}
        >
          <PlusIcon size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Todo List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Loading tasks...</Text>
        </View>
      ) : todos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <ClipboardIcon size={80} color="#334155" />
          <Text style={styles.emptyTitle}>No tasks yet</Text>
          <Text style={styles.emptySubtitle}>
            Create your first task to get started!
          </Text>
          <TouchableOpacity style={styles.emptyButton} onPress={() => {}}>
            <Text style={styles.emptyButtonIcon}>➕</Text>
            <Text style={styles.emptyButtonText}>Add Your First Task</Text>
          </TouchableOpacity>
        </View>
      ) : (
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
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#0f172a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  appIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
  },
  appIconText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold",
    color: "#f8fafc",
    letterSpacing: -0.5,
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
  },
  statBadge: {
    backgroundColor: "#1e293b",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statBadgeSuccess: {
    backgroundColor: "#065f4615",
    borderWidth: 1,
    borderColor: "#10b98120",
  },
  statNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f8fafc",
  },
  statNumberSuccess: {
    color: "#10b981",
  },
  statLabel: {
    fontSize: 11,
    color: "#94a3b8",
  },
  statLabelSuccess: {
    color: "#059669",
  },
  logoutBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#1e293b",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  logoutText: { 
    fontSize: 14, 
    color: "#ef4444",
    fontWeight: "600",
  },
  progressSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  progressText: {
    fontSize: 14,
    color: "#94a3b8",
    fontWeight: "600",
  },
  progressPercent: {
    fontSize: 14,
    color: "#10b981",
    fontWeight: "bold",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#1e293b",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#10b981",
    borderRadius: 4,
  },
  inputSection: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: "#f8fafc",
  },
  addBtn: {
    backgroundColor: "#6366f1",
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    color: "#94a3b8",
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f8fafc",
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  emptyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#1e293b",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#6366f1",
  },
  emptyButtonIcon: {
    fontSize: 18,
  },
  emptyButtonText: {
    color: "#6366f1",
    fontSize: 16,
    fontWeight: "600",
  },
  // Custom icon styles
  iconCircle: {
    borderRadius: 100,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  iconCheck: {
    fontWeight: "bold",
  },
  listLine: {
    height: 2,
    borderRadius: 1,
  },
  plusHorizontal: {
    position: "absolute",
    borderRadius: 2,
  },
  plusVertical: {
    position: "absolute",
    borderRadius: 2,
  },
  clipboard: {
    borderWidth: 3,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  clipboardClip: {
    position: "absolute",
    top: -6,
    height: 8,
    borderRadius: 2,
  },
  clipboardLine: {
    height: 3,
    borderRadius: 2,
  },
});