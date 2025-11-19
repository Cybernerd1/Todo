import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, register } from "../api/auth";

export default function AuthScreen({ onAuth }) {
    const [mode, setMode] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const submit = async () => {
        try {
            setError("");
            const fn = mode === "login" ? login : register;
            const res = await fn(email, password);
            await AsyncStorage.setItem("token", res.data.token);
            onAuth(res.data.token);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{mode === "login" ? "Login" : "Register"}</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={submit}>
                <Text style={styles.buttonText}>
                    {mode === "login" ? "Login" : "Register"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setMode(mode === "login" ? "register" : "login")}
            >
                <Text style={styles.switch}>
                    {mode === "login"
                        ? "No account? Register"
                        : "Already have an account? Login"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#ffffff" },
    title: {
        fontSize: 28, textAlign: "center", marginBottom: 25, color: "#333"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        borderRadius: 6,
        marginBottom: 12,
        color: "#333"
    },
    button: {
        backgroundColor: "black",
        padding: 14,
        borderRadius: 6,
        marginBottom: 10,
    },
    buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
    switch: { textAlign: "center", color: "blue" },
    error: { color: "red", marginBottom: 10, textAlign: "center" },
});
