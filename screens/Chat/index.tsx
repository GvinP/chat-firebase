// @refresh reset
import { ImageBackground, TouchableOpacity, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { useRoute } from "@react-navigation/native";
import { RootRouteProps } from "../../navigation/types";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import Context from "../../context/Context";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { User } from "../../utils";
import {
  GiftedChat,
  User as UserChat,
  Actions,
  InputToolbar,
  Bubble,
} from "react-native-gifted-chat";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

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

  const onSend = async (messages: any[]) => {
    const writes: any[] = messages.map((m) => addDoc(roomMessagesRef, m));
    const lastMessage = messages[messages.length - 1];
    writes.push(updateDoc(roomRef, { lastMessage }));
    await Promise.all(writes);
  };

  const handlePhotoPicker = async () => {};

  return (
    <ImageBackground
      source={require("../../assets/chatbg.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <GiftedChat
        messages={messages.sort((a, b) => {
          return (
            new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
          );
        })}
        user={senderUser}
        onSend={onSend}
        renderActions={(props) => (
          <Actions
            {...props}
            containerStyle={styles.actions}
            onPressActionButton={handlePhotoPicker}
            icon={() => (
              <Ionicons name="camera" size={30} color={colors.iconGray} />
            )}
          />
        )}
        timeTextStyle={{ right: { color: colors.iconGray } }}
        // renderMessage={()=> <View style={{backgroundColor: "teal", width: 100, height: 30}}/>}
        renderSend={(props) => {
          const { text, onSend } = props;
          return (
            <TouchableOpacity
              style={{
                width: 40,
                aspectRatio: 1,
                borderRadius: 20,
                backgroundColor: colors.primary,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 5,
              }}
              onPress={() => {
                if (text && onSend) {
                  onSend(
                    {
                      text: text.trim(),
                    },
                    true
                  );
                }
              }}
            >
              <Ionicons name="send" size={20} color={colors.white} />
            </TouchableOpacity>
          );
        }}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{
              marginHorizontal: 10,
              marginBottom: 2,
              borderRadius: 20,
              paddingTop: 5,
            }}
          />
        )}
        renderBubble={(props) => (
          <Bubble
            {...props}
            textStyle={{ right: { color: colors.text } }}
            wrapperStyle={{
              left: { backgroundColor: colors.white },
              right: { backgroundColor: colors.tertiary },
            }}
          />
        )}
      />
    </ImageBackground>
  );
};

export default Chat;
