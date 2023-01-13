// @refresh reset
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "../../firebase";
import { useRoute } from "@react-navigation/native";
import { RootRouteProps } from "../../navigation/types";

const Chat = () => {
  const { currentUser } = auth;
  const route = useRoute<RootRouteProps<"chat">>();
  const { room, image: selectedImage, user: userB } = route.params;

  const senderUser = {
    name: currentUser?.displayName,
    _id: currentUser?.uid,
    avatar: currentUser?.photoURL ? currentUser?.photoURL : null,
  };
//   const roomId = 
  return (
    <View>
      <Text>{JSON.stringify(userB)}</Text>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
