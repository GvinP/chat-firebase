import { View, Text, FlatList } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import styles from "./styles";
import { useContacts } from "../../hooks";
import ListItem from "../../components/ListItem";
import Context from "../../context/Context";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const Contacts = () => {
  const contacts = useContacts();
  return (
    <FlatList
      data={contacts}
      keyExtractor={(_, index) => `${index}`}
      renderItem={({ item }) => (
        <ContactPreview contact={item} image={item.photoURL || ""} />
      )}
    />
  );
};

interface ContactPreviewProps {
  contact: any;
  image: string;
}

const ContactPreview: React.FC<ContactPreviewProps> = ({ contact, image }) => {
  const { rooms } = useContext(Context);
  const [user, setUser] = useState<any>(contact);
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("email", "==", contact.email)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.docs.length) {
        const userDoc = snapshot.docs[0].data();
        setUser((prevUser: any) => ({ ...prevUser, userDoc }));
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <ListItem
      style={{ marginTop: 7 }}
      type="contacts"
      user={user}
      image={image}
      room={rooms.find((room) =>
        room.participantsArray.includes(contact.email)
      )}
      description={""}
      time={""}
    />
  );
};

export default Contacts;
