import React from "react";
import { View } from "react-native";
import StartupFaqScreen from "../screens/StartupFaqScreen";
import DiscussionsScreen from "../screens/DiscussionsScreen";
import TeamScreen from "../screens/TeamScreen";

const EmptyContainer = ({ children, }) => {
  return (
    <View style={{
      width: "100%",
      minHeight: 1500,
      backgroundColor: "#FFF",
    }}>
      {children}
    </View>
  )
};
export const renderScene = (startup, navigation) => {
  const OverviewScene = () => (
    <StartupRoute routeKey="overview" color="white"></StartupRoute>
  );
  const ProductScene = () => (
    <StartupRoute routeKey="product" color="white"></StartupRoute>
  );
  const TeamScene = () => (
    <StartupRoute routeKey="team" color="white">
      <TeamScreen startup={startup} navigation={navigation} />
    </StartupRoute>
  );
  const CompanyScene = () => (
    <StartupRoute routeKey="company" color="white"></StartupRoute>
  );
  const DiscussionsScene = () => (
    <StartupRoute routeKey="discussions" color="white">
      <DiscussionsScreen startup={startup} navigation={navigation} />
    </StartupRoute>
  );
  const FaqScene = () => (
    <StartupRoute routeKey="faq" color="white">
      <StartupFaqScreen startup={startup} />
    </StartupRoute>
  );
  const VideosScene = () => (
    <StartupRoute routeKey="videos" color="white"></StartupRoute>
  );

export const getTabComponent = (key, startup, navigation, index) => {
  switch (key) {
    case "overview": {
      return <EmptyContainer>
        {
          index === 0 ?
            <></> :
            <></>
        }
      </EmptyContainer>
    }
    case "product": {
      return <EmptyContainer>
        {
          index === 1 ?
            <></> :
            <></>
        }
      </EmptyContainer>
    }
    case "team": {
      return <EmptyContainer>
        {
          index === 2 ?
            <></> : <></>
        }
      </EmptyContainer>
    }
    case "company": {
      return <EmptyContainer>
        {
          index === 3 ?
            <></> :
            <></>
        }</EmptyContainer>
    }
    case "discussions": {
      return <EmptyContainer>
        {
          index === 4 ?
            <DiscussionsScreen
              startup={startup}
              navigation={navigation}
            /> : <></>
        }
      </EmptyContainer>
    }
    case "faq": {
      return <EmptyContainer>
        {
          index === 5 ?
            <StartupFaqScreen
              startup={startup}
            /> : <></>
        }
      </EmptyContainer>
    }
    case "videos": {
      return <EmptyContainer>
        {
          index === 6 ?
            <></> : <></>
        }
      </EmptyContainer>
    }
    default: { return <></> }
  }
};
