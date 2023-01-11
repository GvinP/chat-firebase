import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import React, { useContext } from "react";
import Context from "../../context/Context";
import styles from "./styles";
import { useAppNavigation } from "../../navigation/types";
import { Grid, Col, Row } from "react-native-easy-grid";
import Avatar from "../Avatar";
import { User } from "../../utils";

interface ListItemProps {
  type: string;
  description: string;
  user: User;
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
      <Grid style={{ maxHeight: 80 }}>
        <Col
          style={{ width: 80, alignItems: "center", justifyContent: "center" }}
        >
          <Avatar user={user} size={type === "contacts" ? 40 : 65} />
        </Col>
        <Col style={{ marginLeft: 10 }}>
          <Row style={{ alignItems: "center" }}>
            <Col>
              <Text>{user.displayName}</Text>
            </Col>
            <Col></Col>
          </Row>
        </Col>
      </Grid>
    </TouchableOpacity>
  );
};

export default ListItem;
