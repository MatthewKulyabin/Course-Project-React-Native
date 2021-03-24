import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {Detail} from '../components/Detail';
import {Icon} from '../components/Icon';
import {loadPrograms} from '../store/actions/program';

export const MainScreen = ({navigation}) => {
	const openProgramHandler = program => {
		navigation.navigate('Program', {
			programId: program.id,
			programTitle: program.title,
		});
	};

	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(loadPrograms());
	}, [dispatch]);

	const programs = useSelector(state => state.program.programs);

	return (
		<View style={styles.wrapper}>
			<FlatList
				data={programs}
				keyExtractor={program => program.id.toString()}
				renderItem={({item}) => (
					<Detail 
						item={item}
						onOpen={openProgramHandler}
					/>
				)}
			/>
		</View>
	);
};

MainScreen.options = ({navigation}) => ({
	title: 'Main',
	headerTitleStyle: {
		fontFamily: 'code-black',
	},
	headerRight: () => {
		return (
			<Icon
				title="Add Program"
				iconName="ios-add"
				onPress={() => navigation.navigate('EditProgram')}
			/>
		);
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
	wrapper: {
		padding: 15,
	},
});
