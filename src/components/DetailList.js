import React, { useState } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';

import { Detail } from '../components/Detail';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const DetailList = ({ data, onOpen, listHeaderComponent }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Detail item={item} onOpen={onOpen} />}
        ListHeaderComponent={() => listHeaderComponent()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 15,
  },
});
