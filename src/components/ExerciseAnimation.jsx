import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { colors } from '../theme';

// Simple animated exercise illustration using shapes
// Each exercise gets a unique animation pattern

export function ExerciseAnimation({ exerciseId, size = 200 }) {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Gentle floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Subtle pulse for breathing effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Get animation style based on exercise type
  const getExerciseStyle = () => {
    const translateY = floatAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -10],
    });

    const baseStyle = {
      transform: [{ translateY }, { scale: pulseAnim }],
    };

    // Custom rotations for certain exercises
    if (exerciseId === 'bicycle-legs' || exerciseId === 'knees-to-chest') {
      const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '10deg'],
      });
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      ).start();
      return {
        transform: [{ translateY }, { scale: pulseAnim }, { rotate }],
      };
    }

    return baseStyle;
  };

  // Get icon/illustration for exercise
  const getExerciseContent = () => {
    const icons = {
      'bicycle-legs': '🚴',
      'i-love-u-massage': '💝',
      'knees-to-chest': '🦵',
      'tummy-time': '👶',
      'chest-to-chest': '🤱',
      'happy-baby': '👶',
      'butterfly-twist': '🦋',
      'football-hold': '🏈',
      'hand-exercises': '✋',
      'assisted-crawling': '👶',
      'downward-dog': '🐕',
      'sitting-on-stool': '🪑',
      'bounce-baby': '⚡',
      'cruising': '🚶',
      'catch-the-toy': '🧸',
      'bubble-gaze': '🫧',
    };

    return icons[exerciseId] || '👶';
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View style={[styles.illustration, getExerciseStyle()]}>
        <View style={styles.circle}>
          <Animated.Text style={styles.icon}>
            {getExerciseContent()}
          </Animated.Text>
        </View>
      </Animated.View>
      
      {/* Decorative elements */}
      <View style={styles.decorTopLeft} />
      <View style={styles.decorBottomRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  illustration: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.primary,
    opacity: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  icon: {
    fontSize: 60,
  },
  decorTopLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.secondary,
    opacity: 0.6,
  },
  decorBottomRight: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.accent,
    opacity: 0.5,
  },
});