import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MainScreen } from '../../screens/MainScreen';
import { EditProgramScreen } from '../../screens/EditProgramScreen';
import { EditStepScreen } from '../../screens/EditStepScreen';
import { EditTaskScreen } from '../../screens/EditTaskScreen';
import { ProgramScreen } from '../../screens/ProgramScreen';
import { StepScreen } from '../../screens/StepScreen';
import { TaskScreen } from '../../screens/TaskScreen';
import { StartScreen } from '../../screens/StartScreen';

const Stack = createStackNavigator();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={MainScreen.options}
      />
      <Stack.Screen
        name="EditProgram"
        component={EditProgramScreen}
        options={EditProgramScreen.options}
      />
      <Stack.Screen
        name="EditStep"
        component={EditStepScreen}
        options={EditStepScreen.options}
      />
      <Stack.Screen name="EditTask" component={EditTaskScreen} />
      <Stack.Screen
        name="Program"
        component={ProgramScreen}
        options={ProgramScreen.options}
      />
      <Stack.Screen
        name="Step"
        component={StepScreen}
        options={StepScreen.options}
      />
      <Stack.Screen
        name="Task"
        component={TaskScreen}
        options={TaskScreen.options}
      />
      <Stack.Screen name="Start" component={StartScreen} />
    </Stack.Navigator>
  );
};
