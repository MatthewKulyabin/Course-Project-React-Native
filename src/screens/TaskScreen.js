import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { THEME } from '../theme';
import { CustomButton } from '../components/CustomButton';
import { Description } from '../components/Description';
import { Icon } from '../components/Icon';

export const TaskScreen = ({ navigation, route }) => {
  const { programId, stepId, taskId, fromWhere } = route.params;

  const task = useSelector((state) =>
    state.program.programs
      .find((program) => program.id === programId)
      .steps.find((step) => step.id === stepId)
      .tasks.find((task) => task.id)
  );

  const start = () => {
    navigation.navigate('Start');
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
        <Text style={styles.time}>{task.time}</Text>
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
