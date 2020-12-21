import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Content, Spinner } from "native-base";
import { withTranslation } from "react-i18next";
import constants from "../constants";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import {
  getStartupTeamMembers,
  openFounderModal,
} from "../redux/ducks/startup";
import FounderCard from "../components/teamMember";
import DividerLine from "../components/dividerLine";
import FounderModal from "../components/founderModal";

class TeamScreen extends Component {
  componentDidMount() {
    this.props.getStartupTeamMembers(this.props.startup.id);
  }

  handlePress(item) {
    if (item.isCEO) {
      return this.props.navigation.navigate("CEOProfileScreen", {
        investorId: item.id,
        startup: this.props.startup,
      });
    }

    return this.props.openFounderModal(item);
  }

  render() {
    const {
      isLoading,
      teamMembers,
      startup: { entrepreneur },
      t,
    } = this.props;
    const { teamTabHorizontalPadding, teamMembersPerRow } = constants;

    const teamMembersWithCEO = teamMembers && [...teamMembers];
    teamMembersWithCEO?.unshift({
      id: entrepreneur.id,
      photoUrl: entrepreneur.photoUrl,
      fullName: "placeholder",
      position: t("teamScreen.ceo"),
      isCEO: true,
    }); //adding the CEO as the first item

    if (!teamMembers || isLoading) {
      return <Spinner color={colors.secondaryColor} />;
    }

    return (
      <Content
        style={{
          ...baseStylesheet.baseContainer,
          paddingHorizontal: teamTabHorizontalPadding,
          paddingTop: 20,
        }}
      >
        <Text style={styles.titleText}>{t("teamScreen.aboutTeam")}</Text>
        <Text style={styles.mainText}>
          {/* Temporary placeholder, description field is missing */}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur
          sunt blanditiis in, quaerat saepe laboriosam odit quisquam ad, labore
          veritatis ea unde inventore suscipit minima maiores! Voluptatem
          voluptatibus quam repellendus.Esse, architecto sunt. Tempore alias est
          aliquid labore consectetur debitis, corporis voluptates et sapiente
          sed officiis repellat delectus facere animi modi minus sit ipsam
          itaque deserunt quas eligendi! Officia, quos?
        </Text>
        <DividerLine />
        <Text style={styles.titleText}>{t("teamScreen.founders")}</Text>
        <View>
          <FlatList
            data={teamMembersWithCEO}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => this.handlePress(item)}>
                <FounderCard
                  imageSrc={item.photoUrl}
                  name={item.fullName}
                  position={item.position}
                  isLastOnLine={(index + 1) % teamMembersPerRow}
                />
              </TouchableOpacity>
            )}
            numColumns={3}
            columnWrapperStyle={{
              marginBottom:
                teamMembersWithCEO.length > teamMembersPerRow ? 20 : 15,
            }}
          />
        </View>
        <DividerLine />
        <Text style={styles.noteText}>
          <Text style={{ fontFamily: "montserrat-semi-bold" }}>
            {t("teamScreen.capitalAtRisk")}
          </Text>{" "}
          {t("teamScreen.diversifyRisk")}
        </Text>
        <FounderModal />
      </Content>
    );
  }
}

const mapStateToProps = (state, props) => ({
  isLoading: state.startup.isLoading,
  teamMembers: state.startup.currentStartupTeamMembers,
});

const mapDispatchToProps = (dispatch) => ({
  getStartupTeamMembers: (id) => dispatch(getStartupTeamMembers(id)),
  openFounderModal: (item) => dispatch(openFounderModal(item)),
});

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(TeamScreen);

const styles = StyleSheet.create({
  mainText: {
    marginBottom: 10,
    fontSize: 14,
    fontFamily: "montserrat-regular",
  },
  titleText: {
    fontSize: 20,
    fontFamily: "montserrat-bold",
    marginBottom: 10,
  },
  noteText: {
    fontSize: 14,
    color: colors.darkText,
    fontFamily: "montserrat-regular",
    marginBottom: 20,
  },
});
