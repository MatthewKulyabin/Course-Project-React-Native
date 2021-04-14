import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderBackButton } from '@react-navigation/stack';
import { View, BackHandler } from 'react-native';

import { THEME } from '../theme';
import { DetailList } from '../components/DetailList';
import { Icon } from '../components/Icon';
import { CustomButton } from '../components/CustomButton';
import { Description } from '../components/Description';
import { NoDetail } from '../components/NoDetail';
import { removeStep } from '../store/actions/program';

export const ProgramScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);

  useLayoutEffect(() => {
    setUpdate((state) => !state);
  }, []);

  const programId = route.params.programId;
  const program = useSelector((state) =>
    state.program.programs.find((program) => program.id === programId)
  );
  console.log(programId);
  const steps = program.steps;

  const editStepNavigation = () => {
    navigation.navigate('EditStep');
  };

  const removeStepHandler = ({ itemId }) => {
    dispatch(removeStep({ programId, stepId: itemId }));
    setUpdate((state) => !state);
  };

  const start = () => {
    navigation.navigate('Start');
  };

  let backPressRemove;

  const handleBackButtonClick = () => {
    backPressRemove();
    navigation.navigate('Main', {
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
      headerLeft: () => {
        return (
          <HeaderBackButton
            onPress={() => {
              backPressRemove ? backPressRemove() : '';
              navigation.navigate('Main', {
                programTitle: program.title,
              });
            }}
          />
        );
      },
    });
  }, [program]);

  const openStepHandler = ({ itemId, itemTitle }) => {
    navigation.navigate('Step', {
      programId: programId,
      stepId: itemId,
      stepTitle: itemTitle,
      fromWhere: 'Program',
    });
  };

  if (!steps) {
    return (
      <NoDetail
        detailName="Step"
        onPress={editStepNavigation}
        description={program.description}
      />
    );
  }

  const listHeaderComponent = () => {
    return (
      <View>
        <CustomButton title="Start" color={THEME.MAIN_COLOR} onPress={start} />
        <Description description={program.description} />
      </View>
    );
  };

  return (
    <DetailList
      data={steps}
      onOpen={openStepHandler}
      listHeaderComponent={listHeaderComponent}
      onLongPress={removeStepHandler}
    />
  );
};

ProgramScreen.options = ({ navigation, route }) => {
  const { programId, programTitle } = route.params;

  return {
    title: programTitle,
    headerTitleStyle: {
      fontFamily: 'code-black',
    },
    headerRight: () => {
      return (
        <Icon
          title="Toggle Drawer"
          iconName="ios-create-outline"
          onPress={() =>
            navigation.navigate('EditProgram', {
              programId,
            })
          }
        />
      );
    },
  };
};
