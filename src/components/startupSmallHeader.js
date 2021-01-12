import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Input, Icon } from "native-base";
import BackgroundImage from "../../assets/blue-header-rect.png";

class SmallStartupHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startupName: "",
    };
  }

  componentDidMount() {
    if (this.props.startup?.name) {
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
            style={styles.startupName}
            value={this.state.startupName}
            placeholder="Startup name"
            placeholderTextColor="rgba(0,0,0,0.3)"
            onChange={(e) => this.setState({ startupName: e })}
            onBlur={() => {
              this.props.updateStartup("name", this.state.startupName);
              // this.props.handleFieldEdit(
              //   "name",
              //   this.state.startupName,
              //   startup?.id
              // );
              // this.props.handleFieldSave("name", startup?.id);
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

export default SmallStartupHeader;

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
