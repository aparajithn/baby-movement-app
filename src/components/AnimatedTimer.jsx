import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { colors, spacing, fontSize } from '../theme';

export function AnimatedTimer({ durationSeconds, onComplete, autoStart = false }) {
  const [timeRemaining, setTimeRemaining] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete?.();
            // Completion animation
            Animated.sequence([
              Animated.timing(scaleAnim, {
                toValue: 1.1,
                duration: 150,
                useNativeDriver: true,
              }),
              Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
              }),
            ]).start();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining, onComplete]);

  // Animate progress
  useEffect(() => {
    const progress = ((durationSeconds - timeRemaining) / durationSeconds) * 360;
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 300,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [timeRemaining, durationSeconds]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    // Pulse animation on start
    if (!isRunning) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(durationSeconds);
    progressAnim.setValue(0);
  };

  const spin = progressAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circleContainer, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.backgroundCircle}>
          <Animated.View style={[styles.progressCircle, { transform: [{ rotate: spin }] }]}>
            <View style={styles.progressHalf}>
              <View style={styles.progressArc} />
            </View>
          </Animated.View>
        </View>
        <View style={styles.innerCircle}>
          <Text style={styles.time}>{formatTime(timeRemaining)}</Text>
          {timeRemaining === durationSeconds && !isRunning && (
            <Text style={styles.hint}>Tap Start</Text>
          )}
        </View>
      </Animated.View>
      
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={toggleTimer}>
          <Text style={styles.buttonText}>{isRunning ? '⏸ Pause' : '▶ Start'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetTimer}>
          <Text style={[styles.buttonText, styles.resetText]}>↺ Reset</Text>
        </TouchableOpacity>
      </View>

      {timeRemaining === 0 && (
        <Text style={styles.complete}>✓ Complete!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: spacing.lg,
  },
  circleContainer: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.background,
    borderWidth: 8,
    borderColor: '#E8E0D8',
    position: 'absolute',
  },
  progressCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    position: 'absolute',
  },
  progressHalf: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  progressArc: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '50%',
    borderBottomWidth: 8,
    borderBottomColor: colors.primary,
  },
  innerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  time: {
    fontSize: 42,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  hint: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  complete: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.success,
    marginTop: spacing.md,
  },
  controls: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.textSecondary,
  },
  buttonText: {
    color: colors.surface,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  resetText: {
    color: colors.textSecondary,
  },
});