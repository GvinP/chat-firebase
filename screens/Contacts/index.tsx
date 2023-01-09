import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";
import { useContacts } from "../../hooks";

const Contacts = () => {
  const contacts = useContacts();
  return (
    <View>
      <Text>{JSON.stringify(contacts, null, 2)}</Text>
    </View>
  );
};

export default Contacts;
