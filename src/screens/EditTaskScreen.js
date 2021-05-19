import React, { useLayoutEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  BackHandler,
  View,
  Text,
  Keyboard,
} from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

import { THEME } from '../theme';
import { DetailEdit } from '../components/DetailEdit';
import { editTask } from '../store/actions/program';

export const EditTaskScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { programId, stepId, taskId, fromWhere } = route.params;
  const task = useSelector((state) =>
    state.program.programs
      .find((p) => p.id === programId)
      .steps.find((s) => s.id === stepId)
      .tasks.find((t) => t.id === taskId)
  );
  let time = task.time;

  const saveHandler = async (title, description) => {
    title = '<T> ' + title;
    await dispatch(
      editTask({ title, description, time, programId, stepId, taskId })
    );
    Alert.alert(
      'Success',
      "You've edited Task",
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const onChange = (event, selectedDate) => {
    let chosedTime;
    selectedDate &&
      (time = selectedDate.getHours() * 60 + selectedDate.getMinutes());
  };

  let backPressRemove;

  const handleBackButtonClick = () => {
    backPressRemove();
    const where = fromWhere === 'Task' ? 'Task' : 'EditTask';
    navigation.navigate('Task', {
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
              const where = fromWhere === 'Task' ? 'Task' : 'EditTask';
              navigation.navigate('Task', {
                taskTitle: task.title,
              });
            }}
          />
        );
      },
    });
  }, []);

  const value = new Date();
  value.setHours(0);
  value.setMinutes(0);
  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <DetailEdit
            onPress={saveHandler}
            placeholderTitle={task.title}
            placeholderDescription={task.description}
          />
          <DateTimePicker
            value={value}
            mode="time"
            onChange={onChange}
            is24Hour={true}
            display="spinner"
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
