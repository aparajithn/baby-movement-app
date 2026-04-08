import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ageMilestones } from '../data/milestones';
import { useApp } from '../context/AppContext';
import { colors, spacing, fontSize } from '../theme';

const CATEGORY_ICONS = {
  movement: '💪',
  social: '😊',
  language: '💬',
  cognitive: '🧠',
};

export function MilestonesScreen() {
  const { milestoneProgress, updateMilestone, baby } = useApp();

  const calculateAgeMonths = () => {
    const birthDate = new Date(baby.birthDate);
    const today = new Date();
    return Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
  };

  const currentAge = calculateAgeMonths();

  const toggleMilestone = (milestoneId) => {
    const currentValue = milestoneProgress[milestoneId] || false;
    updateMilestone(milestoneId, !currentValue);
  };

  const getProgress = (ageMilestone) => {
    const achieved = ageMilestone.milestones.filter(
      m => milestoneProgress[m.id]
    ).length;
    return { achieved, total: ageMilestone.milestones.length };
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📊 {baby.name}'s Milestones</Text>
        <Text style={styles.headerSubtitle}>Based on CDC guidelines</Text>
      </View>

      {ageMilestones.map((ageMilestone) => {
        const { achieved, total } = getProgress(ageMilestone);
        const progressPercent = (achieved / total) * 100;
        const isCurrentAge = currentAge >= ageMilestone.ageMonths && 
          currentAge < (ageMilestone.ageMonths + 2);

        return (
          <View key={ageMilestone.ageMonths} style={styles.ageSection}>
            <View style={styles.ageHeader}>
              <View style={styles.ageTitleRow}>
                <Text style={styles.ageTitle}>{ageMilestone.label}</Text>
                {isCurrentAge && (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentText}>Current</Text>
                  </View>
                )}
              </View>
              <Text style={styles.progressText}>{achieved}/{total} completed</Text>
            </View>

            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
            </View>

            {ageMilestone.milestones.map((milestone) => (
              <TouchableOpacity
                key={milestone.id}
                style={styles.milestoneRow}
                onPress={() => toggleMilestone(milestone.id)}
              >
                <Text style={styles.milestoneIcon}>
                  {milestoneProgress[milestone.id] ? '☑️' : '⬜'}
                </Text>
                <Text style={styles.categoryIcon}>{CATEGORY_ICONS[milestone.category]}</Text>
                <Text style={[
                  styles.milestoneText,
                  milestoneProgress[milestone.id] && styles.milestoneCompleted
                ]}>
                  {milestone.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      })}
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
    marginBottom: spacing.md,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  ageSection: {
    backgroundColor: colors.surface,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  ageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  ageTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ageTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginRight: spacing.sm,
  },
  currentBadge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  currentText: {
    fontSize: 10,
    color: colors.surface,
    fontWeight: '700',
  },
  progressText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    marginBottom: spacing.md,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 4,
  },
  milestoneRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
  },
  milestoneIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
    width: 28,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
    width: 24,
  },
  milestoneText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  milestoneCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
});