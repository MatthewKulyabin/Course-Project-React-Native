import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import {MainDrawerNavigator} from './DrawerNavigation/MainDrawerNavigator';
import {THEME} from '../theme';

const myTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		card: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff',
		primary: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
		text: Platform.OS === 'android' ? '#000' : THEME.MAIN_COLOR,
	},
};

export const AppNavigation = () => {
	return (
		<NavigationContainer theme={myTheme} >
			<MainDrawerNavigator />
		</NavigationContainer>
	);
};
