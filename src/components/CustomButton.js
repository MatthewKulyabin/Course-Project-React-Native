import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

import { THEME } from '../theme';

export const CustomButton = ({ title, color, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.wrapper}
      onPress={onPress}
    >
      <View
        style={{
          ...styles.button,
          borderColor: Platform.OS === 'android' ? color : '',
          borderWidth: Platform.OS === 'android' ? 2 : 0,
        }}
      >
        <Text
          style={{
            ...styles.title,
            color: Platform.OS === 'android' ? '#000' : color,
          }}
        >
          {title.toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginVertical: 20,
  },
  button: {
    alignItems: 'center',
    padding: 15,
    width: '100%',
    borderRadius: 5,
  },
  title: {
    fontFamily: 'code-black',
    fontSize: 20,
  },
});
