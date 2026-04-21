import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  StatusBar,
  Text,
} from 'react-native';

const Splash = ({ navigation }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const cursorBlink = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorBlink, {
          toValue: 0,
          duration: 530,
          useNativeDriver: true,
        }),
        Animated.timing(cursorBlink, {
          toValue: 1,
          duration: 530,
          useNativeDriver: true,
        }),
      ]),
    );
    blink.start();

    const t = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => navigation.replace('Onboarding'));
    }, 2400);

    return () => {
      clearTimeout(t);
      blink.stop();
    };
  }, [navigation, opacity, cursorBlink]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.View style={[styles.row, { opacity }]}>
        <Text style={styles.title}>ALPEXA SUISSE</Text>
        <Animated.View
          style={[styles.cursor, { opacity: cursorBlink }]}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'DMSans-Bold',
    fontWeight: '700',
    letterSpacing: 2,
  },
  cursor: {
    width: 3,
    height: 26,
    marginLeft: 4,
    backgroundColor: '#2B7CFF',
    borderRadius: 1,
  },
});

export default Splash;