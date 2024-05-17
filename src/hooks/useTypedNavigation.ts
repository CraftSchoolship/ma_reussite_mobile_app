import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

export const useTypedNavigation = <T extends object>() => {
  return useNavigation<NavigationProp<T>>();
};
export const useTypedRoute = <T extends ParamListBase, U extends keyof T>() => {
  return useRoute<RouteProp<T, U>>();
};
