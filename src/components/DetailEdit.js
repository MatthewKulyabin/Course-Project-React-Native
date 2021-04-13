import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { CustomButton } from '../components/CustomButton';
import { THEME } from '../theme';

export const DetailEdit = ({
  onPress,
  placeholderTitle,
  placeholderDescription,
}) => {
  const [title, setTittle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <View style={styles.center}>
      <Text style={styles.text}>Title</Text>
      <TextInput
        style={styles.title}
        placeholder={placeholderTitle}
        value={title}
        onChangeText={setTittle}
      />
      <Text style={styles.text}>Description</Text>
      <TextInput
        style={styles.description}
        placeholder={placeholderDescription}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <CustomButton
        title="Save"
        onPress={() => onPress(title, description)}
        color={THEME.MAIN_COLOR}
      />
    </View>
  );
};

const textStyle = {
  padding: 10,
  marginBottom: 10,
  color: '#000',
  fontFamily: 'code-black',
  borderWidth: 2,
  borderColor: THEME.MAIN_COLOR,
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    padding: 10,
  },
  title: {
    ...textStyle,
  },
  description: {
    ...textStyle,
  },
  text: {
    fontFamily: 'code-bold',
  },
});
