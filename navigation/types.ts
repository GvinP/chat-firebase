import { NavigationProp, useNavigation, NavigatorScreenParams } from "@react-navigation/native";

export type RootParamList = {
  home: NavigatorScreenParams<TabParamList>;
  profile: undefined;
};

export type TabParamList = {
  photo: undefined;
  chats: undefined;
};

type UseNavigationType = NavigationProp<RootParamList>;

export const useAppNavigation = () => useNavigation<UseNavigationType>();
