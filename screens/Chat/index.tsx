// @refresh reset
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { useRoute } from "@react-navigation/native";
import { RootRouteProps } from "../../navigation/types";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import Context from "../../context/Context";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { User } from "../../utils";
import { GiftedChat, User as UserChat } from "react-native-gifted-chat";

const randomId = nanoid();

const Chat = () => {
  const [roomHash, setRoomHash] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const {
    theme: { colors },
  } = useContext(Context);
  const { currentUser } = auth;
  const route = useRoute<RootRouteProps<"chat">>();
  const { room: room, image: selectedImage, user: userB } = route.params;

  const senderUser: UserChat = {
    name: currentUser?.displayName || "",
    _id: currentUser?.uid || "",
    avatar: currentUser?.photoURL || "",
  };
  const roomId = room ? room.id : randomId;
  const roomRef = doc(db, "rooms", roomId);
  const roomMessagesRef = collection(db, "rooms", roomId, "messages");
  useEffect(() => {
    (async () => {
      if (!room) {
        const currenUserData: User = {
          displayName: currentUser?.displayName || "",
          email: currentUser?.email || "",
          photoURL: currentUser?.photoURL || "",
        };
        const userBData: User = {
          displayName: userB.displayName,
          email: userB.email,
          photoURL: userB.photoURL || "",
        };
        const roomData = {
          participants: [currenUserData, userBData],
          participantsArray: [currenUserData.email, userBData.email],
        };
        try {
          await setDoc(roomRef, roomData);
        } catch (error) {
          console.log(error);
        }
      }
      const emailHash = `${currentUser?.email}:${userB.email}`;
      setRoomHash(emailHash);
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(roomMessagesRef, (querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        });
      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    (messages: any[]) => {
      setMessages((prevMessages) => GiftedChat.append(prevMessages, messages));
    },
    [messages]
  );

  const onSend = (messages: any[]) => {};

  return (
    <ImageBackground
      source={require("../../assets/chatbg.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <GiftedChat
        messages={messages}
        user={senderUser}
        onSend={(messages) => onSend(messages)}
      />
    </ImageBackground>
  );
};

export default Chat;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
});
