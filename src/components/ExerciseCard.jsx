import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../theme';

export function ExerciseCard({ exercise, onPress, isFavorite, onToggleFavorite }) {
  const getCategoryIcon = (category) => {
    const icons = {
      gas: '💨',
      core: '💪',
      strength: '💪',
      coordination: '🤲',
      stretch: '🧘',
    };
    return icons[category] || '•';
  };

  const getDifficultyLabel = (difficulty) => {
    const labels = {
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
    };
    return labels[difficulty] || difficulty;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.icon}>{getCategoryIcon(exercise.category)}</Text>
        {isFavorite !== undefined && (
          <TouchableOpacity onPress={onToggleFavorite} style={styles.favoriteButton}>
            <Text style={styles.favoriteIcon}>{isFavorite ? '♥' : '♡'}</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.name}>{exercise.name}</Text>
      <Text style={styles.description}>{exercise.description}</Text>
      <View style={styles.footer}>
        <Text style={styles.duration}>⏱️ {exercise.duration}</Text>
        <Text style={styles.difficulty}>↗ {getDifficultyLabel(exercise.difficulty)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginVertical: spacing.sm,
    marginHorizontal: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  icon: {
    fontSize: 24,
  },
  favoriteButton: {
    padding: spacing.xs,
  },
  favoriteIcon: {
    fontSize: 20,
    color: colors.primary,
  },
  name: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  duration: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  difficulty: {
    fontSize: fontSize.sm,
    color: colors.secondary,
  },
});