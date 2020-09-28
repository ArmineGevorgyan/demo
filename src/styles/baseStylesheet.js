import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const baseStylesheet = StyleSheet.create({
  baseContainer: {
    backgroundColor: colors.mainColor,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.mainColor,
    width: "100%",
  },

  paddedContent: {
    padding: 15,
  },

  mainButton: {
    backgroundColor: colors.mainButton,
    color: colors.mainButtonText,
    padding: 15,
    marginBottom: 10,
    marginTop: 15,
    borderRadius: 6,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "montserrat-semi-bold",
    fontSize: 16,
  },

  secondaryButton: {
    backgroundColor: colors.secondaryButton,
    color: colors.secondaryButtonText,
    padding: 11,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.secondaryButtonText,
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 15,
  },

  tertiaryButton: {
    color: colors.secondaryButtonText,
    textDecorationLine: "underline",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "montserrat-semi-bold",
    textTransform: "uppercase",
  },

  inlineButton: {
    backgroundColor: colors.mainButton,
    color: colors.mainButtonText,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "montserrat-semi-bold",
    padding: 12,
    marginTop: 4,
    marginBottom: 4,
    marginRight: 4,
    minWidth: 70,
    height: 44,
    borderRadius: 25,
  },

  inlineButtonInputItem: {
    marginTop: 3,
    marginBottom: 15,
    paddingLeft: 10,
    width: "100%",
    height: 50,
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
    fontSize: 16,
    fontFamily: "montserrat-regular",
    color: colors.mainText,
    marginBottom: "8%",
  },

  largeHeadingText: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "montserrat-light",
    color: colors.mainText,
    marginBottom: 20,
  },

  inputItem: {
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 20,
    paddingLeft: 10,
    width: "100%",
    height: 50,
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

  inputField: {
    fontSize: 16,
    fontFamily: "montserrat-regular",
    width: 100,
  },

  icon: {
    color: colors.lightText,
    fontSize: 20,
  },

  modalView: {
    backgroundColor: colors.mainColor,
    padding: "12%",
    borderRadius: 20,
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
