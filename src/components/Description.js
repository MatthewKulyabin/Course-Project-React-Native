import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

import {getStringCuted} from '../pureFunctions';
import {THEME} from '../theme';

export const Description = ({description}) => {
	const detailDescriptionOpen = () => {
		Alert.alert(
      "Detail Description",
      description,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {cancelable: true},
    );
	};

	return (
		<TouchableOpacity
			style={styles.wrapper}
			onPress={detailDescriptionOpen}
		>
			<View style={styles.contant}>
				<Text style={styles.title}>Description:</Text>
				<Text style={styles.description}>
					{getStringCuted(description)}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	contant: {
		borderWidth: 2,
		borderRadius: 3,
		borderColor: THEME.MAIN_COLOR,
		padding: 10,
	},
	wrapper: {
		marginBottom: 20,
	},
	title: {
		fontFamily: 'code-bold',
		fontSize: 15,
	},
	description: {
		fontFamily: 'code-medium',
	},
});
