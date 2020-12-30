import { Card, Text, View } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { compose } from "redux";
import { connect } from "react-redux";
import { getTime } from "../helpers/timeHelper";
import { withTranslation } from "react-i18next";
import LogoImage from "../../assets/whiteLogo.svg";
import { setNotificationSeen } from "../redux/ducks/notifications";
import { colors } from "../styles/colors";
import * as Navigation from "../helpers/navigationHelper";

class NotificationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSeen: false,
    };
  }

  componentDidMount() {
    this.setState({ isSeen: this.props.data.seen });
  }

  handleNotificationPress() {
    const {
      data: { data },
      setNotificationSeen,
    } = this.props;
    setNotificationSeen(this.props.data.id, this.setToSeen);

    if (!data.path) {
      return;
    }

    Navigation.notificationNavigate(data);
  }

  setToSeen = () => {
    this.setState({ isSeen: true });
  };

  render() {
    const { data } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.handleNotificationPress()}
      >
        <Card
          style={{
            ...styles.container,
            backgroundColor: this.state.isSeen ? colors.disabledInput : "#FFF",
          }}
        >
          {data.data.image ? (
            <Image
              style={styles.imageContainer}
              source={{ uri: data.data.image }}
            />
          ) : (
            <View style={[styles.imageContainer, styles.logo]}>
              <LogoImage />
            </View>
          )}
          <View
            style={{
              flex: 1,
            }}
          >
            <View style={styles.textContainer}>
              <Text
                style={{
                  ...styles.title,
                  fontFamily: this.state.isSeen
                    ? "montserrat-medium"
                    : "montserrat-semi-bold",
                }}
              >
                {data.title}
              </Text>
              <Text style={styles.time}>{getTime(data.createdAt)}</Text>
            </View>
            <Text
              numberOfLines={3}
              style={{
                fontFamily: "montserrat-regular",
                color: this.state.isSeen ? "#707070" : "#1E87F4",
              }}
            >
              {data.body}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNotificationSeen: (id, setSeen) =>
      dispatch(setNotificationSeen(id, setSeen)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(NotificationItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: 48,
    height: 48,
    marginRight: 5,
    borderRadius: 50,
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E87F4",
  },
  title: {
    width: "50%",
  },
  time: {
    fontFamily: "montserrat-medium",
  },
});
