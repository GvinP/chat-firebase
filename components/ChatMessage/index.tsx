import { Image, StyleSheet, Text, View, Animated } from "react-native";
import React from "react";
import {
  IMessage,
  isSameDay,
  isSameUser,
  Message,
  MessageProps,
} from "react-native-gifted-chat";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

type ChatMessageProps = {
  setReplyOnSwipeOpen: (message: IMessage) => void;
} & MessageProps<IMessage>;

const ChatMessage: React.FC<ChatMessageProps> = ({
  setReplyOnSwipeOpen,
  ...props
}) => {
  const isNextMyMessage =
    props.currentMessage &&
    props.nextMessage &&
    isSameUser(props.currentMessage, props.nextMessage) &&
    isSameDay(props.currentMessage, props.nextMessage);
  const renderRightActions = (
    progressAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => {
    const size = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 100],
      outputRange: [0, 1, 1],
    });
    const trans = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -12, -20],
    });

    return (
      <Animated.View
        style={[
          styles.container,
          { transform: [{ scale: size }, { translateX: trans }] },
          { borderWidth: 1 },
          isNextMyMessage
            ? styles.defaultBottomOffset
            : styles.bottomOffsetNext,
          props.position === "right" && styles.leftOffsetValue,
        ]}
      >
        <View style={styles.replyImageWrapper}>
          <Image
            source={require("../../assets/reply.png")}
            style={styles.replyImage}
          />
        </View>
      </Animated.View>
    );
  };
  const onSwipeOpen = () => {
    if (props.currentMessage) {
      setReplyOnSwipeOpen(props.currentMessage);
    }
  };
  return (
    <GestureHandlerRootView>
      <Swipeable
        friction={2}
        rightThreshold={40}
        renderRightActions={renderRightActions}
        onSwipeableOpen={onSwipeOpen}
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
  defaultBottomOffset: {
    marginBottom: 2,
  },
  bottomOffsetNext: {
    marginBottom: 10,
  },
  leftOffsetValue: {
    marginLeft: 16,
  },
});
