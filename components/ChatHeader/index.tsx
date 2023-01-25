import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import Avatar from "../Avatar";
import { useRoute } from "@react-navigation/native";
import { RootRouteProps } from "../../navigation/types";
import Context from "../../context/Context";

const ChatHeader = (props: any) => {
  const route = useRoute<RootRouteProps<"chat">>();
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <View style={styles.container}>
      <Avatar user={route.params.user} size={35} />
      <Text style={[styles.name, { color: colors.white }]}>
        {route.params.user.displayName}
      </Text>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  name: {
    marginLeft: 15,
    fontSize: 18,
  },
});
