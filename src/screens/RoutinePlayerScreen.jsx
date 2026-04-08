import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AnimatedTimer } from '../components/AnimatedTimer';
import { useApp } from '../context/AppContext';
import { routines } from '../data/routines';
import { exercises } from '../data/exercises';
import { colors, spacing, fontSize } from '../theme';

export function RoutinePlayerScreen({ navigation, route }) {
  const { routineId } = route.params;
  const { markCompleted } = useApp();

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const routine = routines.find(r => r.id === routineId);

  if (!routine) {
    return (
      <View style={styles.container}>
        <Text>Routine not found</Text>
      </View>
    );
  }

  const currentExerciseItem = routine.exercises[currentExerciseIndex];
  const currentExercise = exercises.find(e => e.id === currentExerciseItem?.exerciseId);

  const handleNext = useCallback(() => {
    markCompleted(currentExerciseItem.exerciseId);
    if (currentExerciseIndex < routine.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  }, [currentExerciseIndex, routine.exercises.length, markCompleted, currentExerciseItem]);

  const handlePrevious = useCallback(() => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
    }
  }, [currentExerciseIndex]);

  if (isCompleted) {
    return (
      <View style={styles.completedContainer}>
        <Text style={styles.completedEmoji}>🎉</Text>
        <Text style={styles.completedTitle}>Routine Complete!</Text>
        <Text style={styles.completedText}>Great job with {routine.name}</Text>
        <TouchableOpacity style={styles.doneButton} onPress={() => navigation.goBack()}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!currentExercise) {
    return (
      <View style={styles.container}>
        <Text>Exercise not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.routineName}>{routine.name}</Text>
        <View style={styles.progressBarContainer}>
          <View style={[
            styles.progressBar,
            { width: `${((currentExerciseIndex + 1) / routine.exercises.length) * 100}%` }
          ]} />
        </View>
        <Text style={styles.progressText}>
          Exercise {currentExerciseIndex + 1} of {routine.exercises.length}
        </Text>
      </View>

      <View style={styles.exerciseSection}>
        <Text style={styles.exerciseName}>{currentExercise.name}</Text>
        <Text style={styles.exerciseDescription}>{currentExercise.description}</Text>
      </View>

      <AnimatedTimer
        durationSeconds={currentExerciseItem.durationSeconds}
        onComplete={handleNext}
        autoStart={false}
      />

      <View style={styles.stepsSection}>
        <Text style={styles.stepsTitle}>Quick Steps:</Text>
        {currentExercise.steps.slice(0, 3).map((step, index) => (
          <Text key={index} style={styles.stepText}>• {step}</Text>
        ))}
      </View>

      <View style={styles.navigationContainer}>
        {currentExerciseIndex > 0 && (
          <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
            <Text style={styles.navButtonText}>← Previous</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          onPress={handleNext}
        >
          <Text style={[styles.navButtonText, styles.nextButtonText]}>
            {currentExerciseIndex === routine.exercises.length - 1 ? 'Finish' : 'Next →'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  routineName: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  exerciseSection: {
    backgroundColor: colors.surface,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: 16,
  },
  exerciseName: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  exerciseDescription: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  stepsSection: {
    backgroundColor: colors.surface,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: 16,
  },
  stepsTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  stepText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  navButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  navButtonText: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: colors.primary,
  },
  nextButtonText: {
    color: colors.surface,
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.xl,
  },
  completedEmoji: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  completedTitle: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  completedText: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  doneButton: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: 12,
  },
  doneButtonText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.surface,
  },
});