import React, { Component } from "react";
import GrayHeader from "../components/grayHeader";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { getNotifications } from "../redux/ducks/notifications";
import { Spinner, Text } from "native-base";
import { colors } from "../styles/colors";

class Notifications extends Component {
  componentDidMount() {
    this.props.getNotifications();
  };

  render() {
    const { t, navigation, isLoading, notifications } = this.props;

    return (
      <>
        <GrayHeader
          title={t("profileScreen.notification")}
          backButtonHandler={() => navigation.goBack()}
          enableSearch
        />
        {
          isLoading ? <Spinner color={colors.secondaryColor} /> : (
            <>
              {
                notifications ? <></> :
                  <Text style={{
                    marginTop: 150,
                    textAlign: "center",
                    fontFamily:"montserrat-medium",
                  }}
                  >
                    {t("notificationsScreen.emptyScreen")}
                  </Text>
              }
            </>
          )
        }
      </>

    )
  };
};

const mapStateToProps = (state, props) => {
  const isLoading = state.notifications.isLoading;
  const notifications = state.notifications.notifications;

  return {
    isLoading,
    notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotifications: () => dispatch(getNotifications()),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(Notifications);