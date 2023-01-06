import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Constants.statusBarHeight + 20,
  },
  title: {
    fontSize: 22,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 20,
    textAlign: "center",
  },
  photoContainer: {
    width: 120,
    aspectRatio: 1,
    borderRadius: 60,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  input: {
    marginTop: 40,
    borderBottomWidth: 2,
    width: "100%",
    paddingBottom: 10,
  },
  button: {
    width: 80,
    height: 40,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
