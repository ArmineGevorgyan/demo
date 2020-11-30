import React from "react";
import { View, Animated } from "react-native";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import { SceneMap } from "react-native-tab-view"; 

const StartupRoute = ({
  routeKey,
  color,
  children
}) => {
  const scrollPropsAndRef = useCollapsibleScene(routeKey);

  return (
    <Animated.ScrollView
      style={{ backgroundColor: color }}
      {...scrollPropsAndRef}
    >
      <View style={{ height: 1500, }} >
        {children}
      </View>
    </Animated.ScrollView>
  );
};

const OverviewScene = () => <StartupRoute routeKey="overview"></StartupRoute>;
const ProductScene = () => <StartupRoute routeKey="product"></StartupRoute>;
const MarketScene = () => <StartupRoute routeKey="market"></StartupRoute>;
const TeamScene = () => <StartupRoute routeKey="team"></StartupRoute>;
const DiscussionsScene = () => <StartupRoute routeKey="discussions"></StartupRoute>;
const FaqScene = () => <StartupRoute routeKey="faq"></StartupRoute>;
const VideosScene = () => <StartupRoute routeKey="videos"></StartupRoute>;

export const renderScene = SceneMap({
  overview: OverviewScene,
  product: ProductScene,
  market: MarketScene,
  team: TeamScene,
  discussions: DiscussionsScene,
  faq: FaqScene,
  videos: VideosScene,
});