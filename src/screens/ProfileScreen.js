import React, { Component } from "react";
import {
  Text,
  StyleSheet,
} from "react-native";
import {
  Container,
  Content,
  Icon,
  View,
} from "native-base";
import { compose } from "redux";
import { colors } from "../styles/colors";
import { withTranslation } from "react-i18next";
import GrayHeader from "../components/grayHeader";
import { sectionData } from "../helpers/profileScreenHelper";
import { getSectionBorderStyle } from "../helpers/profileScreenHelper";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  };

  navigateTo = (screen) => {
    this.props.navigation.navigate(screen);
  }

  render() {
    const { t } = this.props;

    return (
      <Container>
        <GrayHeader
          title={t("profileScreen.profile")}
        />
        <Content>
          {
            sectionData.map((section, index) => (
              <View
                style={
                  [styles.section,
                  {

                    marginTop: index === 0 ? 20 : 10,
                    marginBottom: index === sectionData.length - 1 ? 20 : 10,
                  }]}
              >
                {
                  section.map((item, index) => (
                    <View>
                      <View
                        style={[
                          styles.sectionListItemStyle,
                          getSectionBorderStyle(index, section.length - 1),
                        ]}
                      >
                        <View style={{
                          flexDirection: "row",
                          alignItems: "center",

                        }}>
                          <View style={[
                            styles.iconContainer,
                            { backgroundColor: item.backgroundColor, }
                          ]}>
                            {item.icon ? <Icon
                              name={item.icon}
                              type={item.iconType}
                              style={styles.icon}
                            /> : item.svg}
                          </View>
                          <Text
                            style={[
                              { fontSize: 18 },
                              item.id === 11 && { color: "#D60000" }
                            ]}
                            onPress={() => item.to && this.navigateTo(item.to)}
                          >
                            {t(`profileScreen.${item.value}`)}
                          </Text>
                        </View>
                        {
                          item.to && <Icon
                            name="chevron-right"
                            type="MaterialCommunityIcons"
                            onPress={() => this.navigateTo(item.to)}
                          />
                        }
                      </View>
                      {
                        index !== section.length - 1 && (
                          <View
                            style={styles.itemSeparator}
                          />
                        )
                      }
                    </View>
                  ))
                }
              </View>
            ))
          }
        </Content>
      </Container>
    )
  }
};

export default compose(
  withTranslation("translations")
)(ProfileScreen);

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.offWhite,
    height: 59,
    marginBottom: 1,
  },
  headerTitle: {
    color: colors.blackBlue,
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
    fontSize: 30,
    fontFamily: "montserrat-regular",
  },
  section: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    shadowColor: "#7364F81A",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 6,
  },
  sectionListItemStyle: {
    flexDirection: "row",
    padding: 14,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: '#FFFFFF',
  },
  itemSeparator: {
    alignSelf: "center",
    width: "100%",
    borderRightColor: "white",
    borderLeftColor: "white",
    backgroundColor: colors.blueBorder,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    height: 1,
  },
  iconContainer: {
    width: 33,
    height: 33,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 17,
  },
  icon: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});
