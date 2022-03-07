import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export const DestinationButton = function (props) {
  return (
    <TouchableOpacity onPress={() => {}} style={styles.container}>
      <View style={styles.leftCol}>
        <Text style={{fontSize: 8}}>{'\u25A0'}</Text>
      </View>
      <View style={styles.centerCol}>
        <Text
          style={{
            fontFamily: 'sans-serif-thin',
            fontSize: 21,
            color: '#545454',
          }}>
          Where to?
        </Text>
      </View>

      <View style={styles.rightCol}>
        <Text style={{fontSize: 8}}></Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: 'absolute',
    flexDirection: 'row',
    width: '90%',
    height: 60,
    top: 70,
    left: 20,
    right: 20,
    borderRadius: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000000',
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  leftCol: {
    flex: 1,
    alignItems: 'center',
  },
  centerCol: {
    flex: 4,
  },
  rightCol: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: '#ededed',
  },
});
