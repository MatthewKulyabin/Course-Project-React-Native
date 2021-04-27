import React, {
  useLayoutEffect,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { View, StyleSheet, FlatList, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Detail } from '../components/Detail';
import { Icon } from '../components/Icon';
import {
  loadPrograms,
  addProgram,
  removeProgram,
} from '../store/actions/program';

export const MainScreen = ({ navigation, route }) => {
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setUpdate((state) => !state);
  }, []);

  const openProgramHandler = ({ itemId, itemTitle }) => {
    navigation.navigate('Program', {
      programId: itemId,
      programTitle: itemTitle,
    });
  };

  const addProgramHandler = useCallback(() => {
    dispatch(
      addProgram({
        id: Date.now().toString(),
        title: '<P> Title',
        description: 'Program Description',
        time: 0,
        steps: [],
      })
    );
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Icon
            title="Add Program"
            iconName="ios-add"
            onPress={() => addProgramHandler()}
          />
        );
      },
    });
  }, [addProgramHandler]);

  useLayoutEffect(() => {
    dispatch(loadPrograms());
  }, []);

  const onLongPress = ({ itemId }) => {
    dispatch(removeProgram({ programId: itemId }));
  };

  const programs = useSelector((state) => state.program.programs);
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={programs}
        keyExtractor={(program) => program.id.toString()}
        renderItem={({ item }) => (
          <Detail
            item={item}
            onOpen={openProgramHandler}
            onLongPress={onLongPress}
          />
        )}
      />
    </View>
  );
};

MainScreen.options = ({ route, navigation, addProgramHandler }) => {
  return {
    title: 'Main',
    headerTitleStyle: {
      fontFamily: 'code-black',
    },
    headerLeft: () => {
      return (
        <Icon
          title="Toggle Drawer"
          iconName="ios-menu"
          onPress={() => navigation.toggleDrawer()}
        />
      );
    },
  };
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
  },
});
