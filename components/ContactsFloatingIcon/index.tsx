import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Context from "../../context/Context";
import styles from "./styles";

const ContactsFloatingIcon = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <TouchableOpacity
      style={[styles.iconContainer, { backgroundColor: colors.secondary }]}
    >
      <MaterialCommunityIcons
        name="android-messages"
        size={30}
        color={colors.white}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

export default ContactsFloatingIcon;
