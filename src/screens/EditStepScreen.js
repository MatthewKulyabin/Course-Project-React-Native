import React, { useState, useLayoutEffect, useCallback } from 'react';
import { TouchableWithoutFeedback, Alert, BackHandler } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';

import { DetailList } from '../components/DetailList';
import { DetailEdit } from '../components/DetailEdit';
import { Icon } from '../components/Icon';
import { addTask, editStep, removeTask } from '../store/actions/program';

export const EditStepScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);

  const { programId, stepId, fromWhere } = route.params;
  const step = useSelector((state) =>
    state.program.programs
      .find((p) => p.id === programId)
      .steps.find((s) => s.id === stepId)
  );
  const tasks = step.tasks;

  const saveHandler = async (title, description) => {
    title = '<S> ' + title;
    await dispatch(editStep({ programId, stepId, title, description }));
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

  const addTaskHandler = useCallback(async () => {
    await dispatch(
      addTask(
        {
          title: '<T> Title',
          description: 'Task Description',
          time: 0,
        },
        programId,
        stepId
      )
    );
    setUpdate((state) => !state);
  }, [dispatch]);

  const removeTaskHandler = async ({ itemId }) => {
    await dispatch(removeTask({ programId, stepId, taskId: itemId }));
    setUpdate((state) => !state);
  };

  let backPressRemove;

  const handleBackButtonClick = () => {
    backPressRemove();
    const where = fromWhere === 'Step' ? 'Step' : 'EditProgram';
    navigation.navigate(where, {
      stepTitle: step.title,
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
      headerRight: () => {
        return (
          <Icon
            title="Add Task"
            iconName="ios-add"
            onPress={() => addTaskHandler()}
          />
        );
      },
      headerLeft: () => {
        return (
          <HeaderBackButton
            onPress={() => {
              backPressRemove ? backPressRemove() : '';
              const where = fromWhere === 'Step' ? 'Step' : 'EditProgram';
              navigation.navigate(where, {
                stepTitle: step.title,
              });
            }}
          />
        );
      },
    });
  }, [addTaskHandler]);

  const openTaskHandler = ({ itemId, itemTitle }) => {
    navigation.navigate('Task', {
      programId,
      stepId,
      taskId: itemId,
      taskTitle: itemTitle,
      fromWhere: 'EditStep',
    });
  };

  const listHeaderComponent = () => (
    <DetailEdit
      onPress={saveHandler}
      placeholderTitle={step.title}
      placeholderDescription={step.description}
    />
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <DetailList
        data={tasks}
        onOpen={openTaskHandler}
        listHeaderComponent={listHeaderComponent}
        onLongPress={removeTaskHandler}
      />
    </TouchableWithoutFeedback>
  );
};

EditStepScreen.options = ({ navigation }) => ({
  title: 'Edit Step',
  headerTitleStyle: {
    fontFamily: 'code-black',
  },
});
