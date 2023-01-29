import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  actions: {
    width: 30,
    height: "100%",
    position: "absolute",
    right: 50,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  imageContainer: {
    borderRadius: 15,
    padding: 2,
  },
  image: {
    width: 200,
    height: 200,
    padding: 6,
    borderRadius: 15,
    resizeMode: "cover"
  },
});

export default styles;
