import React, { Component } from "react";
import { connect } from "formik";
import { compose } from "redux";
import { StyleSheet, Text } from "react-native";

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
        {showMessage && (
          <Text style={styles.error}>
            {errors[name] && touched[name] ? errors[name] : ""}
          </Text>
        )}
      </React.Fragment>
    );
  }
}

export default compose(connect)(Validation);

const styles = StyleSheet.create({
  error: {
    color: "red",
    width: "90%",
    fontSize: 15,
    marginBottom: 5,
  },

  invalid: {
    borderColor: "red",
  },
});
