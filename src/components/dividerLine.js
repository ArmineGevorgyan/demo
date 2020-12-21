import React from 'react';
import { View } from 'react-native';

import { colors } from '../styles/colors';

const DividerLine = ({ style }) => <View style={{ ...style, marginBottom: 15, borderTopColor: colors.blueBorder, borderTopWidth: 1 }} />;

export default DividerLine;
