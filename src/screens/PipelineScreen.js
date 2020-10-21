import {
  Button,
  Container,
  Content,
  Icon,
} from "native-base";
import React, { Component } from "react";
import {
  Text,
  StyleSheet,
} from "react-native";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import GrayHeader from "../components/grayHeader";
import SwitchSelector from "../components/switchSelector";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../styles/colors";

class PipelineScreen extends Component {

  render() {
    const { t } = this.props;

    return (
      <Container>
        <GrayHeader title={t("pipeline.title")}>
          <SwitchSelector
            options={[
              {
                label: t("pipeline.interested"),
                value: false,
              },
              {
                label: t("pipeline.committed"),
                value: true,
              },
            ]}
          />
        </GrayHeader>
        <Content style={{flex:1}}>
          <TouchableOpacity
            style={styles.inviteButton}
          >
            <Icon
              style={{ color: colors.green }}
              name="user-plus"
              type="Feather"
            />
            <Text style={styles.buttonText}>
              {t("pipeline.inviteStartup")}
            </Text>
          </TouchableOpacity>
        </Content>
      </Container>
    )
  }
}

export default compose(
  withTranslation("translations"),
)(PipelineScreen)

const styles = StyleSheet.create({
  inviteButton: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 241,
    height: 50,
    borderRadius: 25,
    marginTop: 9,
    marginBottom:20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#30537729",
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10.32,
    elevation: 10,
  },
  buttonText: {
    color: colors.green,
    fontSize: 16,
    marginLeft:9,
    fontWeight: "bold",
    textAlign: "center",
  },
})