import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Icon} from '../components/Icon';

export const AboutScreen = ({}) => {
	return (
		<View style={styles.center}>
			<Text>AboutScreen</Text>
		</View>
	);
};

AboutScreen.options = ({navigation}) => ({
	title: 'About',
	headerTitleStyle: {
		fontFamily: 'code-black',
	},
	headerLeft: () => {
		return (
			<Icon
				title="Toggle Drawer"
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

