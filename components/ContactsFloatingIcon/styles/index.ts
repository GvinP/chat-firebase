import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    aspectRatio: 1,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    transform: [{ scaleX: -1 }],
  },
});

export default styles;
