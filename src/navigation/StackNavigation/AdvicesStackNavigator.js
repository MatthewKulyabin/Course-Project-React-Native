import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

import {AdvicesScreen} from '../../screens/AdvicesScreen';

const Stack = createStackNavigator();

export const AdvicesStackNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Advices" component={AdvicesScreen}
				options={AdvicesScreen.options}
			/>
		</Stack.Navigator>
	);
};
