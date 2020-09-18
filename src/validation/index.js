import React, { Component } from "react";
import { connect } from "formik";
import { compose } from "redux";
import { StyleSheet, Text } from "react-native";
import { Icon, View } from "native-base";

class Validation extends Component {
  render() {
    const {
      children,
      name,
      showMessage,
      formik: { errors, touched, setFieldTouched, handleChange, handleBlur },
    } = this.props;
    return (
      <React.Fragment>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            style: [
              child.props.style,
              touched[name] && errors[name] ? styles.invalid : "",
            ],
            name: name,
            id: name,
            onChange: (args, data) => {
              setFieldTouched(name, false);
              if (typeof child.props.onChange === "function") {
                child.props.onChange(args, data);
              } else {
                handleChange(args);
              }
            },
            onBlur: (args) => {
              if (typeof child.props.onBlur === "function") {
                child.props.onBlur(args);
              } else {
                handleBlur(args);
              }
            },
          });
        })}
        {showMessage && errors[name] && touched[name] && (
          <View style={styles.errorContainer}>
            <Icon
              style={styles.alertIcon}
              name="alert-triangle"
              type="Feather"
            />
            <Text style={styles.error}>{errors[name]}</Text>
          </View>
        )}
      </React.Fragment>
    );
  }
}

export default compose(connect)(Validation);

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: "row",
  },
  error: {
    color: "red",
    width: "85%",
    marginLeft: 5,
    fontSize: 15,
  },

  alertIcon: {
    fontSize: 17,
    color: "red",
  },

  invalid: {
    borderColor: "red",
  },
});
