import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import styles from "./styles";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Context from "../../context/Context";
import ContactsFloatingIcon from "../../components/ContactsFloatingIcon";
import ListItem from "../../components/ListItem";
import { User } from "../../utils";
import { useContacts } from "../../hooks";

const Chats = () => {
  const { currentUser } = auth;
  const { rooms, setRooms } = useContext(Context);
  const contacts = useContacts();
  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantsArray", "array-contains", currentUser?.email)
  );
  useEffect(() => {
    const usubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs
        .filter((doc) => doc.data().lastMessage)
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
          userB: doc
            .data()
            .participants.find((p: any) => p.email !== currentUser?.email),
        }));
      setRooms(parsedChats);
    });
    return () => usubscribe();
  }, []);
  const getUserB = (user: User, contacts: User[]) => {
    return (
      contacts.find((contact) => contact.email === user.email) || ({} as User)
    );
  };
  return (
    <View style={styles.container}>
      {rooms.map((room) => (
        <ListItem
          type="chat"
          description={room.lastMessage.text}
          key={room.id}
          room={room}
          time={room.lastMessage.createdAt}
          user={getUserB(room.userB, contacts)}
          image={""}
        />
      ))}
      <ContactsFloatingIcon />
    </View>
  );
};

export default Chats;
