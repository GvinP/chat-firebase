import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { useAppNavigation } from "../../navigation/types";
import { pickImage } from "../../utils";

const Photo = () => {
  const navigation = useAppNavigation();
  const [cancelled, setCancelled] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const result = await pickImage();
      if (result?.canceled) {
        setCancelled(true);
        setTimeout(() => navigation.navigate("home", { screen: "chats" }), 100);
      }
      if (result) {
        navigation.navigate("contacts", { image: result });
      }
    });
    return () => unsubscribe();
  }, [navigation, cancelled]);

  return (
    <View style={styles.container}>
      <Text>Photo</Text>
    </View>
  );
};

export default Photo;
