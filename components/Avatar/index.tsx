import { Image } from "react-native";
import React from "react";
import { User } from "../../utils";

interface AvatarProps {
  size: number;
  user: User;
}

const Avatar: React.FC<AvatarProps> = ({ size, user }) => {
  return (
    <Image
      style={{ width: size, height: size, borderRadius: size / 2 }}
      source={
        user.photoURL
          ? { uri: user.photoURL }
          : require("../../assets/icon-square.png")
      }
      resizeMode="cover"
    />
  );
};

export default Avatar;
