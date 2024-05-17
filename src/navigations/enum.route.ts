export enum AppRoute {
  Root = "Root",
  Auth = "Auth",
}

export enum MainRoute {
  BOTTOM_TAB_NAVIGATOR = "Bottom_tab_navigator",
}

export type MainNavigatorParams = {
  [MainRoute.BOTTOM_TAB_NAVIGATOR]: undefined;
};
