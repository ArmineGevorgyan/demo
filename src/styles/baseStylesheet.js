import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const baseStylesheet = StyleSheet.create({
  baseContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.mainColor,
  },

  mainButton: {
    backgroundColor: colors.mainButton,
    color: colors.mainButtonText,
    padding: 15,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 5,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
  },

  secondaryButton: {
    backgroundColor: colors.secondaryButton,
    color: colors.secondaryButtonText,
    padding: 15,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.secondaryButtonText,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
  },

  mainContentText: {
    textAlign: "center",
    fontSize: 20,
    color: colors.mainText,
    marginBottom: 30,
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
