import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type ReplyMessageBarProps = {
  clearReply: () => void;
  message: { text: string };
};

const ReplyMessageBar = ({ clearReply, message }: ReplyMessageBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.replyImageContainer}>
        <Image
          style={styles.replyImage}
          source={require("../../assets/reply.png")}
        />
      </View>
      <View style={styles.messageContainer}>
        <Text>{message.text}</Text>
      </View>
      <TouchableOpacity style={styles.crossButton} onPress={clearReply}>
        <Image
          style={styles.crossButtonIcon}
          source={require("../../assets/remove.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ReplyMessageBar;
