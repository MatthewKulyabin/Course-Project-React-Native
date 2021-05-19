import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  BackHandler,
  AppRegistry,
} from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';

import { Detail } from '../components/Detail';
import { Description } from '../components/Description';
import { CustomButton } from '../components/CustomButton';
import { THEME } from '../theme';
import {
  decreaseTime,
  deleteStep,
  deleteTask,
} from '../store/actions/startProgram';

let interval = 0;
let once = true;
let programSelected;

export const StartScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { programId, fromWhere } = route.params;
  const [startInt, setStartInt] = useState(true);
  const [update, setUpdate] = useState(false);
  const [buttonColor, setButtonColor] = useState(THEME.MAIN_COLOR);

  const program = useSelector((state) => state.startProgram.program);

  useLayoutEffect(() => {
    navigation.setParams({ programTitle: program.title });
  }, []);

  const infoAlert = ({ header, message }) => {
    Alert.alert(
      header,
      message,
      [
        {
          text: 'Ok',
          style: 'ok',
        },
      ],
      { cancelable: true }
    );
  };

  let backPressRemove;

  const handleBackButtonClick = () => {
    if (!interval) {
      backPressRemove();
      navigation.navigate(fromWhere);
    }
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
              if (!interval) {
                backPressRemove ? backPressRemove() : '';
                navigation.navigate(fromWhere);
              }
            }}
          />
        );
      },
    });
  }, [fromWhere]);

  const startPausePress = () => {
    setStartInt((state) => !state);
    if (startInt) {
      setButtonColor(THEME.DANGER_COLOR);
      interval = setInterval(() => {
        if (program.steps[0].tasks[0].time <= 0) {
          clearInterval(interval);
          infoAlert({
            header: 'Time is out',
            message: 'Press "completed" to continue',
          });
          setStartInt((state) => !state);
          setButtonColor(THEME.MAIN_COLOR);
        } else {
          dispatch(
            decreaseTime(program.steps[0].id, program.steps[0].tasks[0].id)
          );
        }
        setUpdate((state) => !state);
      }, 1000);
    } else {
      setButtonColor(THEME.MAIN_COLOR);
      clearInterval(interval);
      interval = 0;
    }
  };

  const completedPress = () => {
    clearInterval(interval);
    setButtonColor(THEME.MAIN_COLOR);
    setStartInt((state) => !state);
    interval = 0;
    if (program.steps[0].tasks.length === 1) {
      dispatch(deleteStep(program.steps[0].id));
    } else {
      dispatch(deleteTask(program.steps[0].id, program.steps[0].tasks[0].id));
    }
    setUpdate((state) => !state);
  };

  const longPress = () => {};

  if (!program.steps.length) {
    infoAlert({
      header: 'Completed!',
      message: 'The program has been completed',
    });
    navigation.navigate('Main');
    return <View></View>;
  }
  return (
    <ScrollView>
      <View style={styles.center}>
        <Detail
          item={program.steps[0]}
          onOpen={longPress}
          onLongPress={longPress}
        />
        <Detail
          item={program.steps[0].tasks[0]}
          onOpen={longPress}
          onLongPress={longPress}
        />
        <Description description={program.steps[0].tasks[0].description} />
        <CustomButton
          title="Completed"
          color={THEME.MAIN_COLOR}
          onPress={completedPress}
        />
        <CustomButton
          title="Start/Pause"
          color={buttonColor}
          onPress={startPausePress}
        />
        {/* <CustomButton title="Stop" color={THEME.DANGER_COLOR} onPress={press} /> */}
      </View>
    </ScrollView>
  );
};

StartScreen.options = ({ navigation, route }) => {
  const { programTitle } = route.params;
  return {
    title: programTitle,
    headerTitleStyle: {
      fontFamily: 'code-black',
    },
  };
};

const styles = StyleSheet.create({
  center: {
    padding: 15,
  },
});
