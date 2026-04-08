import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { routines } from '../data/routines';
import { colors, spacing, fontSize } from '../theme';

const AGE_GROUPS = [
  { label: '0-2mo', min: 0, max: 2, color: '#FFB5BA' },
  { label: '2-4mo', min: 2, max: 4, color: '#FFE4B5' },
  { label: '4-6mo', min: 4, max: 6, color: '#B5E4C9' },
  { label: '6-8mo', min: 6, max: 8, color: '#B5D4E4' },
  { label: '8-10mo', min: 8, max: 10, color: '#D4B5E4' },
  { label: '10-12mo', min: 10, max: 12, color: '#E4B5D4' },
  { label: '12mo+', min: 12, max: 24, color: '#B5B5E4' },
];

export function HomeScreen({ navigation }) {
  const { baby } = useApp();

  const calculateAge = () => {
    const birthDate = new Date(baby.birthDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - birthDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const months = Math.floor(diffDays / 30.44);
    
    if (months < 1) return `${weeks} weeks old`;
    return `${months} month${months === 1 ? '' : 's'} old`;
  };

  const getCurrentAgeMonths = () => {
    const birthDate = new Date(baby.birthDate);
    const today = new Date();
    return Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
  };

  const navigateToAgeExercises = (minAge, maxAge) => {
    navigation.navigate('ExerciseList', { minAge, maxAge });
  };

  const navigateToRoutine = (routineId) => {
    navigation.navigate('RoutinePlayer', { routineId });
  };

  const currentAge = getCurrentAgeMonths();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning ✨</Text>
        <Text style={styles.babyInfo}>{baby.name} is {calculateAge()}</Text>
      </View>

      <Text style={styles.sectionTitle}>Quick Routines</Text>
      <View style={styles.routinesContainer}>
        {routines.map((routine) => (
          <TouchableOpacity
            key={routine.id}
            style={styles.routineCard}
            onPress={() => navigateToRoutine(routine.id)}
          >
            <Text style={styles.routineIcon}>{routine.icon}</Text>
            <Text style={styles.routineName}>{routine.name}</Text>
            <Text style={styles.routineDuration}>{routine.totalDuration}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Explore by Age</Text>
      <View style={styles.ageContainer}>
        {AGE_GROUPS.map((age) => (
          <TouchableOpacity
            key={age.label}
            style={[
              styles.ageChip,
              currentAge >= age.min && currentAge <= age.max && styles.currentAgeChip,
              { backgroundColor: age.color },
            ]}
            onPress={() => navigateToAgeExercises(age.min, age.max)}
          >
            <Text style={styles.ageText}>{age.label}</Text>
            {currentAge >= age.min && currentAge <= age.max && (
              <View style={styles.currentBadge}>
                <Text style={styles.currentText}>Now</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.milestonesCard}
        onPress={() => navigation.navigate('Milestones')}
      >
        <Text style={styles.sectionTitle}>📊 Milestones</Text>
        <Text style={styles.milestoneText}>Track {baby.name}'s development</Text>
        <Text style={styles.milestoneSubtext}>Tap to see CDC milestones →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  greeting: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  babyInfo: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginHorizontal: spacing.md,
  },
  routinesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    gap: spacing.md,
  },
  routineCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  routineIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  routineName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  routineDuration: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  ageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    gap: spacing.sm,
  },
  ageChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    position: 'relative',
  },
  currentAgeChip: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  ageText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  currentBadge: {
    position: 'absolute',
    top: -8,
    right: -4,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  currentText: {
    fontSize: 10,
    color: colors.surface,
    fontWeight: '700',
  },
  milestonesCard: {
    backgroundColor: colors.surface,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: spacing.xl,
  },
  milestoneText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  milestoneSubtext: {
    fontSize: fontSize.sm,
    color: colors.primary,
    marginTop: spacing.sm,
  },
});