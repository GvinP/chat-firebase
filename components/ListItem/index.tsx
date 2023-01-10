import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import React, { useContext } from "react";
import Context from "../../context/Context";
import styles from "./styles";
import { useAppNavigation } from "../../navigation/types";
import {Grid} from "react-native-easy-grid"

interface ListItemProps {
  type: string;
  description: string;
  user: string;
  style: ViewStyle;
  time: string;
  room: string;
  image: string;
}

const ListItem: React.FC<ListItemProps> = ({
  type,
  description,
  user,
  style,
  time,
  room,
  image,
}) => {
  const navigation = useAppNavigation();
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <TouchableOpacity
      style={{ height: 80, ...style }}
      onPress={() => navigation.navigate("chat", { user, room, image })}
    >
      <Grid style={{maxHeight: 80}}>

      </Grid>
    </TouchableOpacity>
  );
};

export default ListItem;
