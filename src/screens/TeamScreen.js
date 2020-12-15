import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Content, Spinner } from "native-base";
import { withTranslation } from "react-i18next";

import constants from '../constants';
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import { getStartupTeamMembers } from "../redux/ducks/startup";
import FounderCard, { DividerLine } from "../components/teamMember";

class TeamScreen extends Component {
  componentDidMount() {
    this.props.getStartupTeamMembers(this.props.startup.id);
  }

  render() {
    const {
      isLoading,
      teamMembers
    } = this.props;

    const sortedTeamMembers = teamMembers && teamMembers.slice().sort(teamMember1 => teamMember1.position === "CEO" ? -1 : 0); //slice is for not mutating teamMembers

    if (!teamMembers || isLoading) {
      return <Spinner color={colors.secondaryColor} />;
    }

    return (
      <Content style={{...baseStylesheet.baseContainer, paddingHorizontal: constants.teamTabHorizontalPadding, paddingTop: 20 }}>
        <Text style={styles.titleText}>
          About team
        </Text>
        <Text style={styles.mainText}>
          {/* Temporary placeholder, description field is missing */}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur sunt blanditiis in, quaerat saepe laboriosam odit quisquam ad, labore veritatis ea unde inventore suscipit minima maiores! Voluptatem voluptatibus quam repellendus.Esse, architecto sunt. Tempore alias est aliquid labore consectetur debitis, corporis voluptates et sapiente sed officiis repellat delectus facere animi modi minus sit ipsam itaque deserunt quas eligendi! Officia, quos?
        </Text>
        <DividerLine />
        <Text style={styles.titleText}>
          Founders
        </Text>
        <View>
          <FlatList
            data={sortedTeamMembers}
            keyExtractor={item => item.id} 
            renderItem={({ item, index }) => <FounderCard imageSrc={item.photoUrl} name={item.fullName} position={item.position} isLastOnLine={((index+1)%3)} />}
            numColumns={3}
            columnWrapperStyle={{ marginBottom: sortedTeamMembers.length > 3 ? 20 : 15 }}
          />
        </View>
        <DividerLine />
        <Text style={styles.noteText}>
          <Text style={{ fontFamily: "montserrat-semi-bold" }}>Capital at risk:</Text> Diversify to spread your risk. Approved as a financial promotion by Draper Walled Garden (FCA No.650209).
        </Text>
      </Content>
    );
  }
}

const mapStateToProps = (state, props) => ({
  isLoading: state.startup.isLoading,
  teamMembers: state.startup.currentStartupTeamMembers
});

const mapDispatchToProps = (dispatch) => ({
  getStartupTeamMembers: id => dispatch(getStartupTeamMembers(id))
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
    marginBottom: 10
  },
  noteText: {
    fontSize: 14,
    color: colors.darkText,
    fontFamily: "montserrat-regular",
    marginBottom: 20
  },
});
