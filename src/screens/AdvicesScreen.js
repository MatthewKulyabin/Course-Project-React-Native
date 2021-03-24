import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Icon} from '../components/Icon';

export const AdvicesScreen = ({}) => {
	return (
		<View style={styles.center}>
			<Text>AdvicesScreen</Text>
		</View>
	);
};

AdvicesScreen.options = ({navigation}) => ({
	title: 'Advices',
	headerTitleStyle: {
		fontFamily: 'code-black',
	},
	headerLeft: () => {
		return (
			<Icon
				title="toggleDrawer"
				iconName="ios-menu"
				onPress={() => navigation.toggleDrawer()}
			/>
		);
	},
});

const styles = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

