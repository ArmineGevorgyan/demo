import React from "react";
import { View, Animated } from "react-native";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import { SceneMap } from "react-native-tab-view";
import StartupFaqScreen from "../screens/StartupFaqScreen";
import DiscussionsScreen from "../screens/DiscussionsScreen";

const StartupRoute = ({ routeKey, color, children }) => {
  const scrollPropsAndRef = useCollapsibleScene(routeKey);

  return (
    <Animated.ScrollView
      style={{ backgroundColor: color }}
      {...scrollPropsAndRef}
    >
      <View style={{ height: 1500 }}>{children}</View>
    </Animated.ScrollView>
  );
};
export const renderScene = (startup) => {
  const OverviewScene = () => (
    <StartupRoute routeKey="overview" color="white"></StartupRoute>
  );
  const ProductScene = () => (
    <StartupRoute routeKey="product" color="white"></StartupRoute>
  );
  const MarketScene = () => (
    <StartupRoute routeKey="market" color="white"></StartupRoute>
  );
  const TeamScene = () => (
    <StartupRoute routeKey="team" color="white"></StartupRoute>
  );
  const DiscussionsScene = () => (
    <StartupRoute routeKey="discussions" color="white">
      <DiscussionsScreen startup={startup} />
    </StartupRoute>
  );
  const FaqScene = () => (
    <StartupRoute routeKey="faq" color="white">
      <StartupFaqScreen />
    </StartupRoute>
  );
  const VideosScene = () => (
    <StartupRoute routeKey="videos" color="white"></StartupRoute>
  );

  return SceneMap({
    overview: OverviewScene,
    product: ProductScene,
    market: MarketScene,
    team: TeamScene,
    discussions: DiscussionsScene,
    faq: FaqScene,
    videos: VideosScene,
  });
};
