import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "native-base";
import Slider from "react-native-slider-custom";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../styles/colors";

const GradientSlider = (min, max, value) => {
  const gradient = (
    <View style={{ ...styles.trackBorder, height: value > 0 ? 20 : 0 }}>
      <LinearGradient
        colors={[colors.darkGradient, colors.lightGradient]}
        style={styles.track}
        start={[0, 0]}
        end={[1, 0]}
      />
    </View>
  );

  const thumb =
    value > 0 ? (
      <View>
        <Icon name="triangle-down" type="Entypo" style={styles.icon} />
        <View height={5} />
        <Icon name="triangle-up" type="Entypo" style={styles.icon} />
      </View>
    ) : (
      <></>
    );

  return (
    <Slider
      disabled={true}
      trackStyle={styles.trackContainer}
      customMinimumTrack={gradient}
      customThumb={thumb}
      minimumValue={min}
      maximumValue={max}
      value={value}
      minimumTrackTintColor={colors.secondaryColor}
      maximumTrackTintColor="#E4EBF2"
    />
  );
};

export default GradientSlider;

const styles = StyleSheet.create({
  track: {
    height: 20,
  },
  trackContainer: {
    height: 20,
    borderRadius: 10,
    borderColor: colors.blueBorder,
  },
  trackBorder: {
    height: 20,
    borderRightWidth: 1,
    borderColor: "white",
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  icon: {
    color: colors.blueBorder,
  },
});
