import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { Keyboard } from "react-native";
import { Input, Icon } from "native-base";
import BackgroundImage from "../../assets/blue-header-rect.png";

class SmallStartupHeader extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      startupName: "",
    };
  }

  componentDidMount() {
    Keyboard.addListener("keyboardDidHide", this.unBlurInputs);

    if (this.props.startup?.name) {
      this.setState({ startupName: this.props.startup?.name });
    }
  }

  unBlurInputs = () => {
    this.inputRef?._root?.blur();
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.entrepreneurStartup?.name !== this.props.startupName &&
      this.props.entrepreneurStartup?.name !== ""
    ) {
      this.setState({ startupName: this.props.startup?.name });
    }
  }

  render() {
    return (
      <ImageBackground source={BackgroundImage} style={styles.container}>
        <View style={styles.content}>
          {this.props.goBack ? (
            <TouchableOpacity onPress={this.props.goBack}>
              <Icon name="arrow-left" type="Feather" style={styles.icon} />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 30 }}></View>
          )}

          <Input
            blurOnSubmit
            ref={(input) => {
              this.inputRef = input;
            }}
            style={styles.startupName}
            value={this.state.startupName}
            placeholder="Startup name"
            placeholderTextColor="rgba(0,0,0,0.3)"
            onChangeText={(e) => this.setState({ startupName: e })}
            onBlur={() => {
              this.props.updateStartup("name", this.state.startupName);
            }}
          />
          {this.props.setIsFavorite ? (
            <TouchableOpacity
              onPress={() => this.props.setIsFavorite(!this.props.isFavorite)}
            >
              {!this.props.isFavorite ? (
                <Icon name="star" type="Feather" style={styles.icon} />
              ) : (
                <Icon
                  name="star"
                  type="MaterialCommunityIcons"
                  style={{
                    color: "#FFFF00",
                  }}
                />
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Icon name="bell" type="Feather" style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state, props) => {
  const startupName = state.startup.startupName;
  const entrepreneurStartup =
    state.startup.entrepreneurStartups && state.startup.entrepreneurStartups[0];
  return {
    startupName,
    entrepreneurStartup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(SmallStartupHeader);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    height: "100%",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  startupName: {
    color: "#FFF",
    fontSize: 22,
    fontFamily: "montserrat-semi-bold",
    textAlign: "center",
  },
  iconButton: {
    width: 70,
    height: 70,
    padding: 15,
    justifyContent: "center",
  },
  icon: {
    color: "#FFF",
  },
});
