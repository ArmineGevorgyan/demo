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
    padding: 15,
    marginBottom: 10,
    marginTop: 15,
    borderRadius: 6,
  },

  mainButtonText: {
    color: colors.mainButtonText,
    width: "100%",
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "montserrat-semi-bold",
    fontSize: 16,
  },

  secondaryButton: {
    backgroundColor: colors.secondaryButton,
    padding: 11,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.secondaryButtonText,
  },

  secondaryButtonText: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 15,
    color: colors.secondaryButtonText,
    width: "100%",
  },

  tertiaryButton: {
    color: colors.secondaryButtonText,
    textDecorationLine: "underline",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "montserrat-semi-bold",
    textTransform: "uppercase",
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
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginTop: 4,
    marginBottom: 4,
    marginRight: 4,
    minWidth: 70,
    height: 44,
    borderRadius: 25,
  },

  inlineButtonText: {
    color: colors.mainButtonText,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "montserrat-semi-bold",
    width: "100%",
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
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
