import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, StatusBar, Image, Dimensions, Text } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const Splash = ({ navigation }) => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const glowScale = useRef(new Animated.Value(0.8)).current;
  const particles = useRef([...Array(6)].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Start glow animation
    Animated.parallel([
      Animated.timing(glowOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(glowScale, {
        toValue: 1.2,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Logo animation
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Particle animations
        particles.forEach((particle, index) => {
          Animated.sequence([
            Animated.delay(index * 100),
            Animated.timing(particle, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
          ]).start();
        });

        // Hold then exit
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(logoOpacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(logoScale, {
              toValue: 1.3,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(glowOpacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]).start(() => {
            navigation.replace('Onboarding');
          });
        }, 2000);
      });
    });

    return () => {};
  }, [navigation]);

  const particleStyles = particles.map((p) => ({
    opacity: p,
    transform: [
      {
        translateY: p.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -100],
        }),
      },
      {
        scale: p.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Animated Background Gradient */}
      <View style={styles.backgroundGradient} />

      {/* SVG Radial Gradient Background */}
      <Svg style={styles.svgBackground} width={width} height={height}>
        <Defs>
          <RadialGradient id="grad" cx="50%" cy="50%" rx="50%" ry="50%">
            <Stop offset="0%" stopColor="#00D09C" stopOpacity="0.15" />
            <Stop offset="50%" stopColor="#00D09C" stopOpacity="0.05" />
            <Stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Circle cx={width / 2} cy={height / 2} r={300} fill="url(#grad)" />
      </Svg>

      {/* Particle Effects */}
      {particles.map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            particleStyles[index],
            {
              left: `${15 + index * 14}%`,
              bottom: height * 0.3,
            },
          ]}
        />
      ))}

      {/* Main Logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <View style={styles.logoGlowBackdrop} />
        <Image
          source={require('../assets/images/Logo-removebg-preview.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Brand Text */}
      <Animated.View
        style={[
          styles.brandContainer,
          {
            opacity: logoOpacity,
          },
        ]}
      >
        <Text style={styles.brandText}>ALPEXA SUISSE</Text>
        <Text style={styles.taglineText}>The Future of Finance</Text>
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
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
  },
  svgBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  glowOrb: {
    position: 'absolute',
    borderRadius: 200,
    backgroundColor: '#00D09C',
    shadowColor: '#00D09C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 60,
    elevation: 20,
  },
  glowOrb1: {
    width: 300,
    height: 300,
    top: -100,
    left: -100,
    opacity: 0.3,
  },
  glowOrb2: {
    width: 250,
    height: 250,
    bottom: -50,
    right: -50,
    opacity: 0.2,
  },
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00D09C',
    shadowColor: '#00D09C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  logoContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 10,
  },
  logoGlowBackdrop: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(0, 208, 156, 0.2)',
    shadowColor: '#00D09C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 40,
    elevation: 30,
  },
  logo: {
    width:200,
    height: 200,
    zIndex: 1,
  },
  brandContainer: {
    alignItems: 'center',
    marginTop: 40,
    zIndex: 10,
  },
  brandText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'DMSans-Bold',
    fontWeight: '700',
    letterSpacing: 3,
  },
  taglineText: {
    color: '#888888',
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
    fontWeight: '500',
    marginTop: 8,
    letterSpacing: 1,
  },
});

export default Splash;