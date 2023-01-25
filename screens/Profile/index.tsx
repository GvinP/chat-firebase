import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Context from "../../context/Context";
import styles from "./styles";
import { askForPermission, pickImage, uploadImage } from "../../utils";
import { PermissionStatus } from "expo-image-picker";
import { auth, db } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useAppNavigation } from "../../navigation/types";

const Profile = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  const [displayName, setDisplayName] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus | null>(null);
  const navigation = useAppNavigation();

  useEffect(() => {
    (async () => {
      const status = await askForPermission();
      if (status) {
        setPermissionStatus(status);
      }
    })();
  }, []);

  const handleProfileImage = async () => {
    const result = await pickImage();
    if (!result?.canceled) {
      setSelectedImage(result?.assets?.[0].uri || "");
    }
  };

  const handlePress = async () => {
    const user = auth.currentUser;
    let photoURL;
    if (selectedImage) {
      const response = await uploadImage(
        selectedImage,
        `images/${user?.uid}`,
        "profilePicture"
      );
      if (response) {
        const { url, fileName } = response;
        photoURL = url;
      }
    }
    const userData = {
      displayName,
      email: user?.email,
      photoURL: "",
    };
    if (photoURL) {
      userData.photoURL = photoURL;
    }
    if (user) {
      try {
        await Promise.all([
          updateProfile(user, userData),
          setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid }),
        ]);
        navigation.navigate("home", { screen: "chats" });
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!permissionStatus) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={[styles.container, { backgroundColor: colors.white }]}
      enableOnAndroid={true}
      scrollEnabled={false}
    >
      <StatusBar style="auto" />
      <Text style={[styles.title, { color: colors.foreground }]}>Profile</Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>
        Please provide your name and an optional profile photo
      </Text>
      <TouchableOpacity
        style={[styles.photoContainer, { backgroundColor: colors.background }]}
        onPress={handleProfileImage}
      >
        {!selectedImage ? (
          <MaterialCommunityIcons
            name="camera-plus"
            color={colors.iconGray}
            size={45}
          />
        ) : (
          <Image source={{ uri: selectedImage }} style={styles.photo} />
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Type your name"
        value={displayName}
        onChangeText={setDisplayName}
        style={[styles.input, { borderBottomColor: colors.primary }]}
      />
      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: displayName ? colors.secondary : colors.background,
          },
        ]}
        onPress={handlePress}
        disabled={!displayName}
      >
        <Text style={{ color: displayName ? colors.white : colors.text }}>
          Next
        </Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

export default Profile;
