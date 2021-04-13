import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

export const DetailEditList = (data) => {
	<View style={styles.wrapper}>
		<FlatList
			data={data}
		/>
	</View>
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		padding: 15,
	},
});
