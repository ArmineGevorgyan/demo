import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, ImageBackground, Text, View, Image } from "react-native";
import { withTranslation } from "react-i18next";
import { Icon, Spinner } from "native-base";
import Modal from "react-native-modal";
import { baseStylesheet } from "../styles/baseStylesheet";
import { closeFounderModal } from "../redux/ducks/startup";
import HeaderImage from "../../assets/blue-header-rect.png";
import { colors } from "../styles/colors";
import { linkedin } from "./socialLinks";
import ContentField from "./contentField";

class FounderModal extends Component {
  render() {
    const { profile, isModalOpen, closeFounderModal } = this.props;

    if (!profile) {
      return <Spinner color={colors.secondaryColor} />;
    }

    return (
      <>
        <Modal
          isVisible={isModalOpen}
          backdropOpacity={0.5}
          onBackButtonPress={() => closeFounderModal()}
        >
          <View style={[baseStylesheet.modalView, styles.modal]}>
            <ImageBackground source={HeaderImage} style={styles.container}>
              <Icon
                name="close"
                type="AntDesign"
                style={styles.icon}
                onPress={() => closeFounderModal()}
              />
              <View style={styles.nameView}>
                <Text style={styles.name}>{profile.fullName}</Text>
              </View>
            </ImageBackground>
            <Image style={styles.photo} source={{ uri: profile.photoUrl }} />
            <View style={styles.founderInfo}>
              <Text style={styles.position}>{profile.position}</Text>
              {linkedin(profile.linkedinProfile)}
            </View>
            <View style={styles.bio}>
              <ContentField sty content={profile.bio} />
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  const isModalOpen = state.startup.isModalOpen;
  const profile = state.startup.founderModalItem;

  return {
    isModalOpen,
    profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeFounderModal: () => dispatch(closeFounderModal()),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(FounderModal);

const styles = StyleSheet.create({
  modal: {
    padding: 0,
  },
  container: {
    paddingTop: "3%",
    paddingLeft: "3%",
    paddingRight: "3%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    height: 125,
    marginBottom: 30,
  },
  photo: {
    marginTop: "-26%",
    marginLeft: "5%",
    marginBottom: "5%",
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  icon: {
    fontSize: 32,
    color: "white",
    alignSelf: "flex-end",
  },
  name: {
    color: "white",
    fontFamily: "montserrat-bold",
    fontSize: 20,
    marginLeft: 125,
    marginBottom: "-25%",
  },
  nameView: {
    justifyContent: "flex-end",
  },
  founderInfo: {
    marginTop: "-20%",
    marginLeft: 135,
  },
  position: {
    fontSize: 14,
    fontFamily: "montserrat-regular",
    marginBottom: 7,
  },
  bio: {
    padding: "5%",
  },
});
