import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  LogBox,
} from "react-native";
import { useAssets } from "expo-asset";
import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./screens/SignIn";
import ContextWrapper from "./context/ContextWrapper";

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

const Stack = createNativeStackNavigator();

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        console.log({ user });
        setCurrentUser(user);
      }
    });
    return () => unsubscribe();
  }, []);
  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} />
      </View>
    );

  return (
    <NavigationContainer>
      {!currentUser ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="signIn" component={SignIn} />
        </Stack.Navigator>
      ) : (
        <Text>{JSON.stringify(currentUser, null, 2)}</Text>
      )}
    </NavigationContainer>
  );
}

function Main() {
  const [assets] = useAssets([
    require("./assets/icon-square.png"),
    require("./assets/chatbg.png"),
    require("./assets/user-icon.png"),
    require("./assets/welcome-img.png"),
  ]);
  if (!assets) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <ContextWrapper>
      <App />
    </ContextWrapper>
  );
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
