import {
  NavigationProp,
  useNavigation,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { User } from "../utils";

export type RootParamList = {
  home: NavigatorScreenParams<TabParamList>;
  profile: undefined;
  contacts: undefined;
  chat: {
    room: string;
    user: User;
    image: string;
  };
  signIn: undefined;
};

export type TabParamList = {
  photo: undefined;
  chats: undefined;
};

type UseNavigationType = NavigationProp<RootParamList>;

export const useAppNavigation = () => useNavigation<UseNavigationType>();
