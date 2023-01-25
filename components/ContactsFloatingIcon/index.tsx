import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Context from "../../context/Context";
import styles from "./styles";
import { useAppNavigation } from "../../navigation/types";

const ContactsFloatingIcon = () => {
  const navigation = useAppNavigation();
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <TouchableOpacity
      style={[styles.iconContainer, { backgroundColor: colors.secondary }]}
      onPress={() => navigation.navigate("contacts")}
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
