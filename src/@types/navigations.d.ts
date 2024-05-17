import { NavigatorScreenParams, PathConfig } from "@react-navigation/native";
import { MainTabRoute } from "_components/AppBottomTab";
import { AppRoute, MainRoute } from "_/navigations/enum.route";
import { AuthRoute } from "_/auth/navigation/auth.routes";

export type AppNavigatorParams = {
  [AppRoute.Root]: NavigatorScreenParams<MainNavigatorParams>;
  [AppRoute.Auth]: NavigatorScreenParams<AuthNavigatorParams>;
};

export type AuthNavigatorParams = {
  [AuthRoute.LOGIN]: undefined;
  [AuthRoute.REGISTER]: { goBack: boolean };
};

export type MainNavigatorParams = {
  [MainRoute.BOTTOM_TAB_NAVIGATOR]: NavigatorScreenParams<MainTabRouteParams>;
};

export type MainTabRouteParams = {
  [MainTabRoute.HOME]: undefined;
  [MainTabRoute.EXEMPLE1]: { goBack: boolean };
  [MainTabRoute.EXEMPLE2]: { goBack: boolean };
  [MainTabRoute.EXEMPLE3]: { goBack: boolean };
};

export type LinkingConfig = {
  initialRouteName?:
    | keyof AppNavigatorParams
    | keyof MainNavigatorParams
    | keyof AuthNavigatorParams;
  screens: {
    [AppRoute.Root]: {
      screens: {
        [MainRoute.BOTTOM_TAB_NAVIGATOR]: {
          path?: string;
          screens: {
            [MainTabRoute.HOME]: PathConfig<object>;
            [MainTabRoute.EXEMPLE1]: PathConfig<object>;
            [MainTabRoute.EXEMPLE2]: PathConfig<object>;
            [MainTabRoute.EXEMPLE3]: PathConfig<object>;
          };
        };
      };
    };
    [AppRoute.Auth]: {
      screens: {
        [AuthRoute.LOGIN]: PathConfig<object>;
        [AuthRoute.REGISTER]: PathConfig<object>;
      };
    };
  };
};
