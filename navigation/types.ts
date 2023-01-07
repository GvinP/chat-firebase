import { NavigationProp, useNavigation } from "@react-navigation/native";

export type RootParamList = {
  home: undefined;
  profile: undefined;
};

type UseNavigationType = NavigationProp<RootParamList>;

export const useAppNavigation = () => useNavigation<UseNavigationType>();
