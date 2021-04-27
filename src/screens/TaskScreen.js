import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';

import { THEME } from '../theme';
import { CustomButton } from '../components/CustomButton';
import { Description } from '../components/Description';
import { Icon } from '../components/Icon';
import { editTime } from '../pureFunctions';
import { loadProgram } from '../store/actions/startProgram';
import { hasTasks } from '../pureFunctions';

export const TaskScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { programId, stepId, taskId, fromWhere } = route.params;

  const program = useSelector((state) =>
    state.program.programs.find((program) => program.id === programId)
  );

  const task = program.steps
    .find((step) => step.id === stepId)
    .tasks.find((task) => task.id === taskId);

  const start = () => {
    if (program.steps.length && hasTasks(program.steps)) {
      dispatch(loadProgram(JSON.parse(JSON.stringify(program))));
      navigation.navigate('Start', { programId, fromWhere: 'Task' });
    }
  };

  let backPressRemove;

  const handleBackButtonClick = () => {
    backPressRemove();
    const where = fromWhere === 'Step' ? 'Step' : 'EditStep';
    navigation.navigate(where, {
      taskTitle: task.title,
    });
    return true;
  };

  useLayoutEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    backPressRemove = () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick
      );
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderBackButton
            onPress={() => {
              backPressRemove ? backPressRemove() : '';
              const where = fromWhere === 'Step' ? 'Step' : 'EditStep';
              navigation.navigate(where, {
                taskTitle: task.title,
              });
            }}
          />
        );
      },
    });
  }, []);

  return (
    <View style={styles.wrapper}>
      <CustomButton title="Start" color={THEME.MAIN_COLOR} onPress={start} />
      <View style={styles.timeWrapper}>
        <Text style={styles.time}>{editTime(task.time)}</Text>
      </View>
      <Description description={task.description} />
    </View>
  );
};

TaskScreen.options = ({ navigation, route }) => {
  const { taskTitle, programId, stepId, taskId } = route.params;
  return {
    title: taskTitle,
    headerTitleStyle: {
      fontFamily: 'code-black',
    },
    headerRight: () => {
      return (
        <Icon
          title="Toggle Drawer"
          iconName="ios-create-outline"
          onPress={() =>
            navigation.navigate('EditTask', {
              programId,
              stepId,
              taskId,
              edit: true,
            })
          }
        />
      );
    },
  };
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 15,
  },
  button: {
    width: '100%',
  },
  timeWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    height: '25%',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: THEME.MAIN_COLOR,
  },
  time: {
    fontFamily: 'code-black',
    fontSize: 25,
  },
});
