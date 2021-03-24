import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import {Detail} from '../components/Detail';
import {CustomButton} from '../components/CustomButton';
import {Description} from '../components/Description';
import {THEME} from '../theme';

export const DetailList = ({data, onOpen, onPress, description}) => {
	return (
		<View style={styles.wrapper}>
			<FlatList
				data={data}
				keyExtractor={item => item.id.toString()}
				renderItem={({item}) => (
					<Detail 
						item={item}
						onOpen={onOpen}
					/>
				)}
				ListHeaderComponent={() => (
					<View>
						<CustomButton
							title="Start"
							color={THEME.MAIN_COLOR}
							onPress={onPress}
						/>
						<Description description={description} />
					</View>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		padding: 15,
	},
});
