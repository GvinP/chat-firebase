import {
  NavigationProp,
  useNavigation,
  NavigatorScreenParams,
  RouteProp,
} from "@react-navigation/native";
import { User } from "../utils";

export type RootParamList = {
  home: NavigatorScreenParams<TabParamList>;
  profile: undefined;
  contacts: { image: string };
  chat: {
    user: User;
    image: string;
    room?: any;
  };
  signIn: undefined;
};

export type TabParamList = {
  photo: undefined;
  chats: undefined;
};

type UseNavigationType = NavigationProp<RootParamList>;

export const useAppNavigation = () => useNavigation<UseNavigationType>();

export type RootRouteProps<RouteName extends keyof RootParamList> = RouteProp<
  RootParamList,
  RouteName
>;
