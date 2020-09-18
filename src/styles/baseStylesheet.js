import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const baseStylesheet = StyleSheet.create({
  baseContainer: {
    marginTop: 10,
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.mainColor,
  },

  mainButton: {
    backgroundColor: colors.mainButton,
    color: colors.mainButtonText,
    padding: 11,
    marginBottom: 10,
    marginTop: 15,
    borderRadius: 5,
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 15,
  },

  inlineButton: {
    backgroundColor: colors.mainButton,
    color: colors.mainButtonText,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    padding: 6,
    marginTop: 2,
    marginRight: 4,
    minWidth: 70,
    height: 34,
    borderRadius: 17,
  },

  inlineButtonInputItem: {
    marginTop: 3,
    marginBottom: 5,
    paddingLeft: 10,
    width: "100%",
    height: 40,
    backgroundColor: "white",

    borderColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },

  mainContentText: {
    textAlign: "center",
    fontSize: 20,
    color: colors.mainText,
    marginBottom: 20,
  },

  largeHeadingText: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "sans-serif-light",
    color: colors.mainText,
    marginBottom: 20,
  },

  inputItem: {
    marginTop: 10,
    marginBottom: 5,
    paddingRight: 20,
    paddingLeft: 10,
    width: "100%",
    height: 40,
    backgroundColor: "white",

    borderColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },

  inputField: {
    fontSize: 15,
  },

  icon: {
    color: colors.lightText,
    fontSize: 17,
    paddingRight: 0,
  },
});

export const headerStyles = {
  headerStyle: {
    backgroundColor: colors.secondaryColor,
  },
  headerTintColor: colors.mainColor,
  headerTitleStyle: {
    fontWeight: "bold",
  },
};
