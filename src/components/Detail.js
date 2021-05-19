import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { THEME } from '../theme';
import { editTime } from '../pureFunctions';

export const Detail = ({ item, onOpen, onLongPress }) => {
  const timeText = '<Time> ';
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onOpen({ itemId: item.id, itemTitle: item.title })}
      onLongPress={() => onLongPress({ itemId: item.id })}
      style={styles.item}
    >
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.time}>
          {timeText}
          {editTime(item.time)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: THEME.DETAIL_COLOR,
    height: 100,
    padding: 20,
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
