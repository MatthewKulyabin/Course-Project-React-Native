import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const EditTaskScreen = ({}) => {
	return (
		<View style={styles.center}>
			<Text>EditTaskScreen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

