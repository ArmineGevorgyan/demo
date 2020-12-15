import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Spinner, Content, } from "native-base";
import { connect } from "react-redux";
import { compose } from "redux";
import { colors } from "../styles/colors";
import { withTranslation } from "react-i18next";
import NoFaqIcon from "../../assets/noFaq.svg";
import { getStartupFaqList } from "../redux/ducks/startup";
import ListAccordion from "../components/listAccordion";
import moment from "moment";

class StartupFaqScreen extends Component {
  componentDidMount() {
    if (!this.props.faqList) {
      this.props.getStartupFaqList(this.props.startup?.id);
    }
  };

  render() {
    const { t, isLoading, faqList } = this.props;

    return (
      <View>
        {isLoading ? (
          <Spinner color={colors.secondaryColor} />
        ) : (
            <>
              {faqList ?
                (<FlatList
                  data={faqList}
                  keyExtractor={(item) => `${item.heldOn}`}
                  renderItem={({ item }) =>
                    <View>
                      <Text style={styles.listHeader}>
                        {`${t("startupFaq.listTitle")} ${moment(item.heldOn).format('D.M.YYYY')}`}
                      </Text>

                      <FlatList
                        data={[1]}
                        keyExtractor={() => `${new Date().getTime().toString()}`}
                        renderItem={() =>
                          <ListAccordion
                            dataArray={item.infoSessionFAQs}
                            hideNumber={true}
                          />
                        }
                      />
                    </View>
                  }
                />)
                :
                (<>
                  <NoFaqIcon style={styles.icon} />
                  <Text style={styles.noFaqTitle}>
                    {t("startupFaq.noFaqTitle")}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "montserrat-regular",
                    }}
                  >
                    {t("startupFaq.noFaqDescription")}
                  </Text>
                </>)
              }
            </>
          )}
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  const isLoading = state.startup.isLoading;
  const faqList = state.startup.faqList;
  return {
    isLoading,
    faqList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStartupFaqList: (id) => dispatch(getStartupFaqList(id)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(StartupFaqScreen);

const styles = StyleSheet.create({
  listHeader: {
    marginLeft: "3%",
    marginTop: 19,
    marginBottom: 10,
    fontFamily: "montserrat-semi-bold",
    fontSize: 12,
  },
  noFaqTitle: {
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 22,
    fontFamily: "montserrat-medium",
  },
  icon: {
    marginTop: 22,
    alignSelf: "center",
  },
});
