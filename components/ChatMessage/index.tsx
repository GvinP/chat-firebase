import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { IMessage, Message, MessageProps } from "react-native-gifted-chat";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

const ChatMessage: React.FC<MessageProps<IMessage>> = (props) => {
  const renderRightActions = () => {
    return (
      <View style={styles.container}>
        <View style={styles.replyImageWrapper}>
          <Image
            source={require("../../assets/reply.png")}
            style={styles.replyImage}
          />
        </View>
      </View>
    );
  };
  return (
    <GestureHandlerRootView>
      <Swipeable
        friction={2}
        rightThreshold={40}
        renderRightActions={renderRightActions}
      >
        <Message {...props} />
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  container: {
    width: 40,
  },
  replyImageWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  replyImage: {
    width: 20,
    height: 20,
  },
});
