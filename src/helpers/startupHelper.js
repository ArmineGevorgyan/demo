import React from "react";
import { View } from "react-native";
import StartupFaqScreen from "../screens/StartupFaqScreen";
import DiscussionsScreen from "../screens/DiscussionsScreen";
import InvestorTeamScreen from "../screens/Startup/Team/InvestorTeamScreen";
import InvestorProductScreen from "../screens/Startup/Product/InvestorProductScreen";
import EntrepreneurProductScreen from "../screens/Startup/Product/EntrepreneurProductScreen";
import CompanyScreen from "../screens/CompanyScreen";
import OverviewScreen from "../screens/OverviewScreen";
import UpdatesScreen from "../screens/UpdatesScreen";
import EntrepreneurTeamScreen from "../screens/Startup/Team/EntrepreneurTeamScreen";

const EmptyContainer = ({ children }) => {
  return (
    <View
      style={{
        width: "100%",
        minHeight: 1500,
        backgroundColor: "#FFF",
      }}
    >
      {children}
    </View>
  );
};

export const getTabComponent = (key, startup, navigation, index, reload) => {
  switch (key) {
    case "overview": {
      return (
        <EmptyContainer>
          {index === 0 ? <OverviewScreen startup={startup} /> : <></>}
        </EmptyContainer>
      );
    }
    case "product": {
      return (
        <EmptyContainer>
          {index === 1 ? (
            <InvestorProductScreen startup={startup} navigation={navigation} />
          ) : (
            <></>
          )}
        </EmptyContainer>
      );
    }
    case "team": {
      return (
        <EmptyContainer>
          {index === 2 ? (
            <InvestorTeamScreen startup={startup} navigation={navigation} />
          ) : (
            <></>
          )}
        </EmptyContainer>
      );
    }
    case "company": {
      return (
        <EmptyContainer>
          {index === 3 ? (
            <CompanyScreen startup={startup} navigation={navigation} />
          ) : (
            <></>
          )}
        </EmptyContainer>
      );
    }
    case "discussions": {
      return (
        <EmptyContainer>
          {index === 4 ? (
            <DiscussionsScreen
              startup={startup}
              navigation={navigation}
              reload={reload}
            />
          ) : (
            <></>
          )}
        </EmptyContainer>
      );
    }
    case "faq": {
      return (
        <EmptyContainer>
          {index === 5 ? <StartupFaqScreen startup={startup} /> : <></>}
        </EmptyContainer>
      );
    }
    case "videos": {
      return <EmptyContainer>{index === 6 ? <></> : <></>}</EmptyContainer>;
    }
    case "updates": {
      return (
        <EmptyContainer>
          {index === 7 ? (
            <UpdatesScreen navigation={navigation} startup={startup} />
          ) : (
            <></>
          )}
        </EmptyContainer>
      );
    }
    default: {
      return <></>;
    }
  }
};

export const getTabPopulateComponent = (key, startup, navigation, index) => {
  switch (key) {
    case "overview": {
      return <EmptyContainer>{index === 0 ? <></> : <></>}</EmptyContainer>;
    }
    case "product": {
      return (
        <EmptyContainer>
          {index === 1 ? (
            <EntrepreneurProductScreen
              startup={startup}
              navigation={navigation}
            />
          ) : (
            <></>
          )}
        </EmptyContainer>
      );
    }
    case "team": {
      return (
        <EmptyContainer>
          {index === 2 ? (
            <EntrepreneurTeamScreen startup={startup} navigation={navigation} />
          ) : (
            <></>
          )}
        </EmptyContainer>
      );
    }
    case "company": {
      return <EmptyContainer>{index === 3 ? <></> : <></>}</EmptyContainer>;
    }
    case "discussions": {
      return <EmptyContainer>{index === 4 ? <></> : <></>}</EmptyContainer>;
    }
    case "faq": {
      return <EmptyContainer>{index === 5 ? <></> : <></>}</EmptyContainer>;
    }
    case "videos": {
      return <EmptyContainer>{index === 6 ? <></> : <></>}</EmptyContainer>;
    }
    default: {
      return <></>;
    }
  }
};
