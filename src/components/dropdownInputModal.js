import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity } from "react-native";
import { Button, Spinner, Input, Item } from "native-base";
import Modal from "react-native-modal";
import { withTranslation } from "react-i18next";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import { FlatList } from "react-native-gesture-handler";
import { Formik } from "formik";
import {
  loadCityList,
  loadMoreCities,
  setInputItem,
} from "../redux/ducks/dropdownInputModal";
import Flag from 'react-native-flags';

class DropdownInputModal extends Component {
  constructor(props) {
    super(props);
  };

  handleClose = () => {
    const { closeModal, setInputItem, } = this.props;
    setInputItem("");
    closeModal();
  };

  handleChange = (e) => {
    this.props.loadCityList(e);
    this.props.setInputItem(e);
  };

  onSelectCity = (item) => {
    this.props.setResult(item, this.props.inputType);
    this.handleClose();
  };

  onSubmit = () => {

  };

  renderItem = ({ item, index, separators }) => (
    <TouchableHighlight
      key={`city_${item.id}`}
      onPress={() => this.onSelectCity(item)}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}
    >
      <View style={styles.listItemContainer}>
        <Flag
          code={item.country?.isoCode}
          size={32}
          style={{ marginRight: 10, }}
        />
        <View style={styles.listItemTextContainer}>
          <Text style={styles.itemText}>
            {item.country?.name + ", "}
          </Text>
          <Text style={styles.itemText}>
            {item?.name + ", "}
          </Text>
          <Text style={styles.itemText}>
            {item.region?.name}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  renderSeparator = () => (<View
    style={{
      backgroundColor: colors.blueBorder,
      widht: "85%",
      height: 1,
    }} />
  );

  handleOnEndReached = ({ distanceFromEnd }) => {
    if (this.props.noMoreCities) {
      return;
    }
    this.props.loadMoreCities();
  };

  getLoadingMoreSpinner = () => {
    if (this.props.loadingMore) {
      return <Spinner color={colors.secondaryColor} />;
    }

    return <></>;
  };


  render() {
    const { t,
      isModalOpen,
      isLoading,
      inputItem,
    } = this.props;

    return (
      <Modal
        isVisible={isModalOpen}
        backdropOpacity={0.5}
        onBackButtonPress={() => this.handleClose()}
      >
        {
          isLoading
          && <View style={styles.spinnerContainer}>
            <Spinner
              style={styles.spinner}
              color={colors.secondaryColor}
            />
          </View>
        }

        <View style={styles.modalContainer}>
          <Text
            style={styles.modalTitle}
          >
            {this.props.title}
          </Text>
          <Formik
            initialValues={{
              input: this.props.input,
            }}
            onSubmit={this.onSubmit}
          >
            {(props) => {
              const values = props.values;
              return (
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
                      value={values.input}
                      onChangeText={(e) => {
                        props.handleChange("input");
                        this.handleChange(e);
                      }}
                    />
                  </Item>
                </View>
              )
            }}
          </Formik>

          <TouchableOpacity
            style={{
              marginBottom: 10,
            }}
            onPress={() => this.onSelectCity(inputItem)}
          >
            <Text style={{
              ...styles.itemText,

            }}>
              {inputItem}
            </Text>
            {this.renderSeparator()}
          </TouchableOpacity>

          <FlatList
            data={this.props.cityList}
            onEndReachedThreshold={0.1}
            renderItem={this.renderItem}
            onEndReached={this.handleOnEndReached}
            ListFooterComponent={this.getLoadingMoreSpinner}
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
              {t("dropDownInputModal.cancelButton")}
            </Text>
          </Button>
        </View>
      </Modal >
    );
  }
}

const mapStateToProps = (state, props) => {
  const title = state.dropdownInputModal.title;
  const isLoading = state.dropdownInputModal.isLoading;
  const inputType = state.dropdownInputModal.inputType;
  const loadingMore = state.dropdownInputModal.loadingMore;
  const noMoreCities = state.dropdownInputModal.noMoreCities;
  const cityList = state.dropdownInputModal.cityList;
  const inputItem = state.dropdownInputModal.inputItem;

  return {
    title,
    isLoading,
    inputType,
    loadingMore,
    noMoreCities,
    cityList,
    inputItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCityList: (search) => dispatch(loadCityList(search)),
    loadMoreCities: () => dispatch(loadMoreCities()),
    setInputItem: (input) => dispatch(setInputItem(input)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(DropdownInputModal);

const styles = StyleSheet.create({
  modalContainer: {
    height: "90%",
    backgroundColor: colors.mainColor,
    padding: "5%",
    borderRadius: 20,
  },
  listItemContainer: {
    backgroundColor: 'white',
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  listItemTextContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
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
  inputItemText: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 41,
  },
  spinnerContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  spinner: {
    alignSelf: "center",
    justifyContent: "center",
    position: "relative",
  },
});