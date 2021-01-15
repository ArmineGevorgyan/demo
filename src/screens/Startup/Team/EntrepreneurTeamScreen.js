import { Text } from "native-base";
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";

class EntrepreneurTeamScreen extends Component {
  render() {
    return <></>;
  }
}

const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(EntrepreneurTeamScreen);
