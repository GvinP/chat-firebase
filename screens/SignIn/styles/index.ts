import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1,
  },
  title: {
    fontSize: 24,
    marginTop: 150,
    marginBottom: 20,
    alignSelf: "center"
  },
  image: {
    width: 180,
    height: 180,
    alignSelf: "center"
  },
  input: {
    borderBottomWidth: 2,
    width: 200,
    alignSelf: "center"
  },
  button: {
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  buttonText: {
    fontSize: 18,
  },
});

export default styles;
