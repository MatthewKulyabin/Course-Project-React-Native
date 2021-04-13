import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {THEME} from '../theme';
import {CustomButton} from './CustomButton';
import {Description} from './Description';

export const NoDetail = ({navigation, detailName, onPress, description}) => {
	const title = "Add" + detailName;
	const text = detailName[0].toLowerCase() + detailName.slice(1) + 's';

	return (
		<View style={styles.noDetailWrapper}>
			<Description
				description={description}
			/>
			<Text
				style={styles.noDetailText}
			>
				There is no {text} yet
			</Text>
			<CustomButton
				title={title}
				color={THEME.MAIN_COLOR}
				onPress={onPress}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	noDetailWrapper: {
		flex: 1,
		marginTop: 10,
		padding: 20,
	},
	noDetailText: {
		fontFamily: 'code-black',
		fontSize: 20,
	},
});
