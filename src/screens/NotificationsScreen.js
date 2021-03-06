import React, { Component } from "react";
import GrayHeader from "../components/grayHeader";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { Spinner, View, Container, Content } from "native-base";
import { colors } from "../styles/colors";
import EmptyList from "../components/emptyList";
import {
  getNotifications,
  loadMoreNotifications,
} from "../redux/ducks/notifications";
import { FlatList } from "react-native-gesture-handler";
import NotificationItem from "../components/notificationItem";

class Notifications extends Component {
  componentDidMount() {
    this.props.getNotifications();
  }

  renderItem = ({ item, index }) => <NotificationItem data={item} />;

  handleOnEndReached = ({ distanceFromEnd }) => {
    if (this.props.noMoreNotifications) {
      return;
    }
    this.props.loadMoreNotifications();
  };

  getLoadingMoreSpinner = () => {
    if (this.props.loadingMore) {
      return <Spinner color={colors.secondaryColor} />;
    }

    return <></>;
  };

  render() {
    const { t, navigation, isLoading, notifications } = this.props;

    return (
      <Container>
        <GrayHeader
          title={t("profileScreen.notification")}
          backButtonHandler={() => navigation.goBack()}
          enableSearch
        />
        <Content>
          {isLoading ? (
            <Spinner color={colors.secondaryColor} />
          ) : (
            <View
              style={{
                margin: "3%",
              }}
            >
              {notifications ? (
                <FlatList
                  data={notifications
                    .slice()
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )}
                  onEndReachedThreshold={0.1}
                  renderItem={this.renderItem}
                  onEndReached={this.handleOnEndReached}
                  ListFooterComponent={this.getLoadingMoreSpinner}
                />
              ) : (
                <EmptyList text={t("notificationsScreen.emptyScreen")} />
              )}
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => {
  const isLoading = state.notifications.isLoading;
  const loadingMore = state.notifications.loadingMore;
  const noMoreNotifications = state.notifications.noMoreNotifications;
  const notifications = state.notifications.notifications;

  return {
    isLoading,
    loadingMore,
    noMoreNotifications,
    notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotifications: () => dispatch(getNotifications()),
    loadMoreNotifications: () => dispatch(loadMoreNotifications()),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(Notifications);
