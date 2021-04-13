import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { THEME } from '../theme';

export const Detail = ({ item, onOpen, onLongPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onOpen({ itemId: item.id, itemTitle: item.title })}
      onLongPress={() => onLongPress({ itemId: item.id })}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: THEME.DETAIL_COLOR,
    height: 100,
  },
  title: {
    fontFamily: 'code-bold',
    fontSize: 20,
    marginRight: 50,
  },
  time: {
    fontFamily: 'code-bold',
    fontSize: 20,
  },
});
