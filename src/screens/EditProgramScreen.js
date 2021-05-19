import React, { useLayoutEffect, useState, useCallback } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  BackHandler,
} from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';

import { DetailEdit } from '../components/DetailEdit';
import { DetailList } from '../components/DetailList';
import { Icon } from '../components/Icon';
import { editProgram } from '../store/actions/program';
import { addStep, removeStep } from '../store/actions/program';

export const EditProgramScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { programId } = route.params;
  const [update, setUpdate] = useState(false);

  const program = useSelector((state) =>
    state.program.programs.find((p) => p.id === programId)
  );
  console.log('Updated editProgramScreen', program);
  const steps = program.steps;

  const saveHandler = async (title, description) => {
    title = '<P> ' + title;
    await dispatch(editProgram({ programId, title, description }));
    Alert.alert(
      'Success',
      "You've edited program",
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const addStepHandler = useCallback(async () => {
    await dispatch(
      addStep(
        {
          title: '<S> Title',
          description: 'Step Description',
          time: 0,
          tasks: [],
        },
        programId
      )
    );
    setUpdate((state) => {
      console.log('Update', state);
      return !state;
    });
  }, [dispatch]);

  const removeStepHandler = async ({ itemId }) => {
    await dispatch(removeStep({ programId, stepId: itemId }));
    setUpdate((state) => !state);
  };

  let backPressRemove;

  const handleBackButtonClick = () => {
    backPressRemove();
    navigation.navigate('Program', {
      programTitle: program.title,
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
            title="Add Step"
            iconName="ios-add"
            onPress={() => addStepHandler()}
          />
        );
      },
      headerLeft: () => {
        return (
          <HeaderBackButton
            onPress={() => {
              backPressRemove ? backPressRemove() : '';
              navigation.navigate('Program', {
                programTitle: program.title,
              });
            }}
          />
        );
      },
    });
  }, [addStepHandler]);

  const openStepHandler = ({ itemId, itemTitle }) => {
    navigation.navigate('Step', {
      programId: programId,
      stepId: itemId,
      stepTitle: itemTitle,
      fromWhere: 'EditProgram',
    });
  };

  const listHeaderComponent = () => (
    <DetailEdit
      onPress={saveHandler}
      placeholderTitle={program.title}
      placeholderDescription={program.description}
    />
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <DetailList
        data={steps}
        onOpen={openStepHandler}
        listHeaderComponent={listHeaderComponent}
        onLongPress={removeStepHandler}
      />
    </TouchableWithoutFeedback>
  );
};

EditProgramScreen.options = ({ navigation }) => ({
  title: 'Edit Program',
  headerTitleStyle: {
    fontFamily: 'code-black',
  },
  headerRight: () => {
    return (
      <Icon
        title="Edit Program"
        iconName="ios-add"
        onPress={() => navigation.navigate('EditStep')}
      />
    );
  },
});
