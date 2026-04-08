import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { exercises } from '../data/exercises';
import { Timer } from '../components/Timer';
import { useApp } from '../context/AppContext';
import { colors, spacing, fontSize } from '../theme';

export function ExerciseDetailScreen({ navigation, route }) {
  const { exerciseId } = route.params;
  const { favoriteExercises, toggleFavorite, markCompleted } = useApp();
  
  const exercise = exercises.find(ex => ex.id === exerciseId);
  
  if (!exercise) {
    return (
      <View style={styles.container}>
        <Text>Exercise not found</Text>
      </View>
    );
  }

  const isFavorite = favoriteExercises.includes(exercise.id);
  const durationSeconds = parseInt(exercise.duration) * 60 || 60;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorite(exercise.id)}>
          <Text style={styles.favoriteIcon}>{isFavorite ? '♥' : '♡'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text style={styles.description}>{exercise.description}</Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Duration</Text>
            <Text style={styles.metaValue}>{exercise.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Difficulty</Text>
            <Text style={styles.metaValue}>{exercise.difficulty}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Age</Text>
            <Text style={styles.metaValue}>{exercise.ageRange[0]}-{exercise.ageRange[1]}mo</Text>
          </View>
        </View>
      </View>

      <Timer 
        durationSeconds={durationSeconds}
        onComplete={() => markCompleted(exercise.id)}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How to do it</Text>
        {exercise.steps.map((step, index) => (
          <View key={index} style={styles.step}>
            <Text style={styles.stepNumber}>{index + 1}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Benefits</Text>
        {exercise.benefits.map((benefit, index) => (
          <Text key={index} style={styles.benefitText}>• {benefit}</Text>
        ))}
      </View>

      <View style={[styles.section, styles.safetySection]}>
        <Text style={styles.sectionTitle}>⚠️ Safety</Text>
        {exercise.safety.map((safety, index) => (
          <Text key={index} style={styles.safetyText}>• {safety}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Tips</Text>
        {exercise.tips.map((tip, index) => (
          <Text key={index} style={styles.tipText}>• {tip}</Text>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.completeButton}
        onPress={() => {
          markCompleted(exercise.id);
          navigation.goBack();
        }}
      >
        <Text style={styles.completeButtonText}>✓ Mark Complete</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
  },
  backButton: {
    fontSize: fontSize.md,
    color: colors.primary,
  },
  favoriteIcon: {
    fontSize: 24,
    color: colors.primary,
  },
  infoSection: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  name: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.md,
  },
  metaItem: {
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  metaValue: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  section: {
    backgroundColor: colors.surface,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  step: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    color: colors.surface,
    textAlign: 'center',
    lineHeight: 24,
    marginRight: spacing.md,
    fontWeight: '600',
  },
  stepText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  benefitText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  safetySection: {
    backgroundColor: '#FFF5F5',
  },
  safetyText: {
    fontSize: fontSize.md,
    color: colors.danger,
    marginBottom: spacing.xs,
  },
  tipText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  completeButton: {
    backgroundColor: colors.success,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  completeButtonText: {
    color: colors.surface,
    fontSize: fontSize.lg,
    fontWeight: '600',
  },
});