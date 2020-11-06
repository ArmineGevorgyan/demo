import React, { Component } from "react";
import { Icon } from "native-base";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import HeaderImage from "../../assets/blue-header-rect.png";

class ProfileBlueHeader extends Component {
  render() {
    const {
      title,
      children,
      backButtonHandler,
    } = this.props;

    return (
      <ImageBackground
        source={HeaderImage}
        style={[
          styles.container,
          children ? styles.withCildren : styles.withoutChildren
        ]}
      >
        <View
          style={styles.textRowContainer}
        >
          <View
            style={{ minWidth: 30 }}
          >
            {
              backButtonHandler &&
              <Icon
                style={{
                  color: "#FFF",
                }}
                name="arrow-left"
                type="Feather"
                onPress={backButtonHandler}
              />
            }
          </View>
          <Text
            style={[
              styles.headerText,
              children && { marginBottom: 15, }
            ]
            }
          >
            {title}
          </Text>
          <View
            style={{
              minWidth: 30
            }}
          >
          </View>
        </View>
        <View
          style={{
            alignSelf: "center",
            position: "absolute",
            bottom: -25,
          }}
        >
          {children}
        </View>
      </ImageBackground>
    );
  }
};

export default ProfileBlueHeader;

const styles = StyleSheet.create({
  container: {
    paddingLeft: "7%",
    paddingRight: "7%",
    height: 161,
    marginBottom: 40,
  },
  withCildren: {
    paddingTop: 50,
  },
  withoutChildren: {
    paddingTop: 25,
    height: 100,
    justifyContent: "center",
  },
  textRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerText: {
    color: "#FFF",
    fontSize: 30,
    fontFamily: "montserrat-light",
    textAlign: "center",
  },
});
