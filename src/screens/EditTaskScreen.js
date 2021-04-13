import React, { useLayoutEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  BackHandler,
} from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';

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

  const saveHandler = (title, description) => {
    dispatch(editTask({ title, description, programId, stepId, taskId }));
    Alert.alert(
      'Success',
      "You've edited Step",
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
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

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <DetailEdit
          onPress={saveHandler}
          placeholderTitle={task.title}
          placeholderDescription={task.description}
        />
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
});
