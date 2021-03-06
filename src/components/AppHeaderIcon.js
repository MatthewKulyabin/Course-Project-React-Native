import React from 'react';
import {Platform} from 'react-native';
import {HeaderButton} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons';

import {THEME} from '../theme';

export const AppHeaderIcon = props => {
	return (
		<HeaderButton
			{...props}
			iconSize={50}
			IconComponent={Ionicons}
			color={Platform.OS === 'android' ? '#000' : THEME.MAIN_COLOR}
		/>
	);
};
