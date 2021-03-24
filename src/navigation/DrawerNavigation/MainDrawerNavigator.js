import React from 'react';
import {Platform} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {MainStackNavigator} from '../StackNavigation/MainStackNavigator';
import {AdvicesStackNavigator} from '../StackNavigation/AdvicesStackNavigator';
import {AboutStackNavigator} from '../StackNavigation/AboutStackNavigator';
import {THEME} from '../../theme';

const Drawer = createDrawerNavigator();

export const MainDrawerNavigator = () => {
	return (
		<Drawer.Navigator
			initialRouteName="Main"
			drawerContentOptions={{
				activeTintColor: Platform.OS === 'android'
					? THEME.MAIN_COLOR
					: '#000',
				labelStyle: {
					fontFamily: 'code-black',
					fontSize: 17,
				},
				activeBackgroundColor: Platform.OS === 'android'
					? '#000'
					: THEME.MAIN_COLOR,
			}}
		>
			<Drawer.Screen name="Main" component={MainStackNavigator}

			/>
			<Drawer.Screen name="Advices" component={AdvicesStackNavigator}/>
			<Drawer.Screen name="About" component={AboutStackNavigator} />
		</Drawer.Navigator>
	);
}; 
