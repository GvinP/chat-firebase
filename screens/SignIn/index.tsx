import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Context from "../../context/Context";
import styles from "./styles";
import { signIn, signUp } from "../../firebase";

const SignIn = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signUp");
  const handlePress = async () => {
    if (mode === "signUp") {
      await signUp(email, password);
    }
    if (mode === "signIn") {
      await signIn(email, password);
    }
  };
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: colors.white }}
      enableOnAndroid={true}
      scrollEnabled={false}
    >
      <Text style={[styles.title, { color: colors.foreground }]}>
        Welcome to WhatsApp
      </Text>
      <Image
        source={require("../../assets/welcome-img.png")}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={{ marginTop: 20 }}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={[styles.input, { borderBottomColor: colors.primary }]}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={[styles.input, { borderBottomColor: colors.primary }]}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Pressable
          style={[styles.button, { backgroundColor: colors.secondary }]}
          disabled={!password || !email}
          onPress={handlePress}
        >
          <Text style={[styles.buttonText, { color: colors.white }]}>
            {mode === "signUp" ? "Sign Up" : "Sign In"}
          </Text>
        </Pressable>
        <TouchableOpacity
          style={{ marginTop: 20, alignSelf: "center" }}
          onPress={() => setMode(mode === "signUp" ? "signIn" : "signUp")}
        >
          <Text style={{ color: colors.secondaryText }}>
            {mode === "signUp"
              ? "Alredy have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignIn;
