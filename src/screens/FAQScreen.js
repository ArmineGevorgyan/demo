import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, View } from "react-native";
import { Content, Spinner } from "native-base";
import { withTranslation } from "react-i18next";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import DWG from "../../assets/DWG.svg";
import GrayHeader from "../components/grayHeader";
import ListAccordion from "../components/listAccordion";
import { getEntrepreneurFAQ, getInvestorFAQ } from "../redux/ducks/faq";
import { isEntrepreneur } from '../helpers/userTypeHelper';

class FAQScreen extends Component {
  componentDidMount() {
    const { user, getEntrepreneurFAQ, getInvestorFAQ } = this.props;

    isEntrepreneur(user?.authorities[0])
      ? getEntrepreneurFAQ()
      : getInvestorFAQ();
  }

  render() {
    const { t, navigation, faqList } = this.props;

    return (
      <>
        <GrayHeader
          title={t("profileScreen.faq")}
          backButtonHandler={() => navigation.goBack()}
          enableSearch
        />
        <Content style={baseStylesheet.baseContainer}>
          <View style={styles.imageContainer}>
            <DWG />
          </View>
          <View style={styles.contextContainer}>
            {faqList ? (
              <ListAccordion dataArray={faqList} />
            ) : (
              <Spinner color={colors.secondaryColor} />
            )}
          </View>
        </Content>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  const faqList = state.faq.faqList;
  const user = state.user.userData;
  return {
    faqList,
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEntrepreneurFAQ: () => dispatch(getEntrepreneurFAQ()),
    getInvestorFAQ: () => dispatch(getInvestorFAQ()),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(FAQScreen);

const styles = StyleSheet.create({
  formContainer: {
    padding: 15,
    alignItems: "center",
    width: "100%",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  picker: { width: "100%", borderRadius: 25, overflow: "hidden" },
  message: { marginBottom: 10, width: "100%" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  counter: {
    color: colors.darkText,
    fontSize: 10,
    fontFamily: "montserrat-regular",
  },
  submitButton: {
    width: "100%",
  },
  pickerIcon: {
    color: colors.lightBlue,
    backgroundColor: "white",
    zIndex: 1,
    position: "absolute",
    bottom: 12,
    right: 25,
    fontSize: 25,
  },
});
