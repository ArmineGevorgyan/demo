import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { Button, Item, Input } from "native-base";
import Modal from "react-native-modal";
import { withTranslation } from "react-i18next";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import { FlatList } from "react-native-gesture-handler";
import { loadTimeZones, setFilteredTimeZones } from "../redux/ducks/timeZoneModal";

class TimeZoneModal extends Component {

  handleClose = () => {
    const { closeModal } = this.props;
    this.props.setFilteredTimeZones(null);
    closeModal();
  };

  handleChange = (e) => {
    const input = e.toLowerCase();
    const filteredTimeZones = this.props.timeZones.filter((item) => {
      return item.name.toLowerCase().includes(input)
        || item.code.toLowerCase().includes(input)
        || item.offset.includes(input);
    });
    this.props.setFilteredTimeZones(filteredTimeZones);
  };

  onSelectTimeZone = (item) => {
    this.props.setResult(item);
    this.handleClose();
  };

  renderItem = ({ item, index, separators }) => (
    <TouchableHighlight
      key={`city_${item.id}`}
      onPress={() => this.onSelectTimeZone(item)}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}
    >
      <View style={{
        backgroundColor: 'white',
        alignItems: "center",
      }}>
        <Text style={{
          ...styles.itemText,
          paddingTop: 10,
          paddingBottom: 5,
        }}>
          {item?.name}
        </Text>
        <View style={styles.timeZoneCode}>
          <Text style={styles.itemText}>
            {item?.code}
          </Text>
          <Text style={{
            ...styles.itemText,
            color: "#1CB41B",
          }}>
            {`UTC ${item?.offset}`}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  )

  renderSeparator = () => {
    return (<View
      style={{
        backgroundColor: colors.blueBorder,
        widht: "85%",
        height: 1,
      }} />
    )
  }

  render() {
    const {
      t,
      isModalOpen,
      timeZones,
      filteredTimeZones,
    } = this.props;

    return (
      <Modal
        isVisible={isModalOpen}
        backdropOpacity={0.5}
        onBackButtonPress={() => this.handleClose()}
      >
        <View style={{
          height: "90%",
          backgroundColor: colors.mainColor,
          padding: "5%",
          borderRadius: 20,
        }}>
          <Text style={styles.modalTitle}>
            {t("timeZoneModal.timeZoneTitle")}
          </Text>
          <View style={styles.formContainer}>
            <Item
              rounded
              style={baseStylesheet.inputItem}
            >
              <Input
                blurOnSubmit={false}
                style={baseStylesheet.inputField}
                placeholder={t("dropDownInputModal.typeHere")}
                placeholderTextColor={colors.lightText}
                value={this.props.input}
                onChangeText={(e) => {
                  this.handleChange(e);
                }}
              />
            </Item>
          </View>
          <FlatList
            data={filteredTimeZones ?? timeZones}
            onEndReachedThreshold={0.1}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
          />

          <Button
            style={{
              ...baseStylesheet.grayButton,
              backgroundColor: colors.offWhite,
            }}
            onPress={() => this.handleClose()}
          >
            <Text style={baseStylesheet.grayButtonText}>
              {t("timeZoneModal.cancelButton")}
            </Text>
          </Button>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state, props) => {
  const timeZones = state.timeZoneModal.timeZones;
  const filteredTimeZones = state.timeZoneModal.filteredTimeZones;

  return {
    timeZones,
    filteredTimeZones,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTimeZones: () => dispatch(loadTimeZones()),
    setFilteredTimeZones: (timeZones) => dispatch(setFilteredTimeZones(timeZones)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(TimeZoneModal);

const styles = StyleSheet.create({
  modalTitle: {
    textAlign: "center",
    color: colors.darkBlue,
    fontSize: 18,
    fontFamily: "montserrat-regular",
    fontWeight: "bold",
  },
  itemText: {
    fontFamily: "montserrat-regular",
  },
  timeZoneCode: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
});