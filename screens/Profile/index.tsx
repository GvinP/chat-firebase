import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Context from "../../context/Context";
import styles from "./styles";
import { askForPermission, pickImage } from "../../utils";
import { PermissionStatus } from "expo-image-picker";

const Profile = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  const [displayName, setDisplayName] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus | null>(null);

  useEffect(() => {
    (async () => {
      const status = await askForPermission();
      if (status) {
        setPermissionStatus(status);
      }
    })();
  }, []);

  const handlePress = async () => {
    const result = await pickImage();
    if (!result?.canceled) {
      setSelectedImage(result?.assets?.[0].uri || "");
    }
  };

  if(!permissionStatus) {
    return (
        <View style={{flex:1, alignItems: "center", justifyContent: "center"}}>
            <ActivityIndicator size="large"/>
        </View>
    )
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
        onPress={handlePress}
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
