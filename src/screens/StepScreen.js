import React, { useLayoutEffect, useState } from 'react';
import { View, BackHandler } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';

import { THEME } from '../theme';
import { CustomButton } from '../components/CustomButton';
import { Description } from '../components/Description';
import { DetailList } from '../components/DetailList';
import { Icon } from '../components/Icon';
import { removeTask } from '../store/actions/program';

export const StepScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const { programId, stepId } = route.params;
  const { fromWhere } = route.params;

  const step = useSelector((state) =>
    state.program.programs
      .find((program) => program.id === programId)
      .steps.find((step) => step.id === stepId)
  );

  const tasks = step.tasks;

  const start = () => {
    navigation.navigate('Start');
  };

  const removeTaskHandler = ({ itemId }) => {
    dispatch(removeTask({ programId, stepId, taskId: itemId }));
    setUpdate((state) => !state);
  };

  let backPressRemove;

  const handleBackButtonClick = () => {
    backPressRemove();
    const where = fromWhere === 'Program' ? 'Program' : 'EditProgram';
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
      headerLeft: () => {
        const where = fromWhere === 'Program' ? 'Program' : 'EditProgram';
        return (
          <HeaderBackButton
            onPress={() => {
              backPressRemove ? backPressRemove() : '';
              navigation.navigate(where, {
                stepTitle: step.title,
              });
            }}
          />
        );
      },
    });
  }, [fromWhere]);

  const openTaskHandler = ({ itemId, itemTitle }) => {
    navigation.navigate('Task', {
      programId,
      stepId: step.id,
      taskId: itemId,
      taskTitle: itemTitle,
      fromWhere: 'Step',
    });
  };

  const listHeaderComponent = () => {
    return (
      <View>
        <CustomButton title="Start" color={THEME.MAIN_COLOR} onPress={start} />
        <Description description={step.description} />
      </View>
    );
  };

  return (
    <DetailList
      data={tasks}
      onOpen={openTaskHandler}
      listHeaderComponent={listHeaderComponent}
      onLongPress={removeTaskHandler}
    />
  );
};

StepScreen.options = ({ navigation, route }) => {
  const { stepTitle, programId, stepId } = route.params;

  return {
    title: stepTitle,
    headerTitleStyle: {
      fontFamily: 'code-black',
    },
    headerRight: () => {
      return (
        <Icon
          title="Toggle Drawer"
          iconName="ios-create-outline"
          onPress={() =>
            navigation.navigate('EditStep', {
              programId,
              stepId,
              fromWhere: 'Step',
            })
          }
        />
      );
    },
  };
};
