import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

import {AboutScreen} from '../../screens/AboutScreen';

const Stack = createStackNavigator();

export const AboutStackNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="About" component={AboutScreen}
				options={AboutScreen.options}
			/>
		</Stack.Navigator>
	);
};

