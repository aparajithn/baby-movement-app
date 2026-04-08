import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import { colors, spacing, fontSize } from '../theme';

export function SettingsScreen() {
  const { baby, updateBaby } = useApp();
  
  const [name, setName] = useState(baby.name);
  const [birthDate, setBirthDate] = useState(new Date(baby.birthDate));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const calculateAge = () => {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - birthDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const months = Math.floor(diffDays / 30.44);
    const years = Math.floor(months / 12);
    
    if (years >= 1) {
      const remainingMonths = months % 12;
      if (remainingMonths === 0) return `${years} year${years === 1 ? '' : 's'} old`;
      return `${years} year${years === 1 ? '' : 's'} ${remainingMonths} month${remainingMonths === 1 ? '' : 's'} old`;
    }
    if (months < 1) return `${weeks} week${weeks === 1 ? '' : 's'} old`;
    return `${months} month${months === 1 ? '' : 's'} old`;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleNameChange = (text) => {
    setName(text);
    setHasChanges(true);
  };

  const adjustDate = (days) => {
    const newDate = new Date(birthDate);
    newDate.setDate(newDate.getDate() + days);
    setBirthDate(newDate);
    setHasChanges(true);
  };

  const adjustMonth = (months) => {
    const newDate = new Date(birthDate);
    newDate.setMonth(newDate.getMonth() + months);
    setBirthDate(newDate);
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a name for your baby');
      return;
    }
    
    await updateBaby({
      name: name.trim(),
      birthDate: birthDate.toISOString(),
    });
    
    setHasChanges(false);
    Alert.alert('Success', 'Baby profile updated!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Baby Profile</Text>
        <Text style={styles.headerSubtitle}>Customize your app experience</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Baby's Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={handleNameChange}
          placeholder="Enter baby's name"
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Birth Date</Text>
        <Text style={styles.dateDisplay}>{formatDate(birthDate)}</Text>
        
        <View style={styles.quickAdjustRow}>
          <Text style={styles.adjustLabel}>Quick adjust:</Text>
          <View style={styles.adjustButtons}>
            <TouchableOpacity style={styles.adjustBtn} onPress={() => adjustDate(-1)}>
              <Text style={styles.adjustBtnText}>-1 day</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.adjustBtn} onPress={() => adjustDate(1)}>
              <Text style={styles.adjustBtnText}>+1 day</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.quickAdjustRow}>
          <View style={styles.adjustButtons}>
            <TouchableOpacity style={styles.adjustBtn} onPress={() => adjustMonth(-1)}>
              <Text style={styles.adjustBtnText}>-1 month</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.adjustBtn} onPress={() => adjustMonth(1)}>
              <Text style={styles.adjustBtnText}>+1 month</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Current Age</Text>
        <Text style={styles.ageText}>{name || 'Baby'} is {calculateAge()}</Text>
        <Text style={styles.ageSubtext}>
          Born on {formatDate(birthDate)}
        </Text>
      </View>

      <TouchableOpacity 
        style={[styles.saveButton, !hasChanges && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={!hasChanges}
      >
        <Text style={styles.saveButtonText}>
          {hasChanges ? 'Save Changes' : 'No Changes'}
        </Text>
      </TouchableOpacity>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>💡 Tip</Text>
        <Text style={styles.infoText}>
          Your baby's age automatically filters exercises and milestones to show only what's appropriate for their development stage.
        </Text>
      </View>

      <View style={styles.versionInfo}>
        <Text style={styles.versionText}>Baby Movement App v1.0</Text>
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
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  card: {
    backgroundColor: colors.surface,
    margin: spacing.md,
    marginTop: 0,
    padding: spacing.lg,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border || '#E0E0E0',
    borderRadius: 12,
    padding: spacing.md,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    backgroundColor: colors.background,
  },
  dateDisplay: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  quickAdjustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  adjustLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginRight: spacing.sm,
  },
  adjustButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  adjustBtn: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border || '#E0E0E0',
  },
  adjustBtnText: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  ageText: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.primary,
  },
  ageSubtext: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  saveButton: {
    backgroundColor: colors.primary,
    margin: spacing.md,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: colors.textSecondary,
    opacity: 0.5,
  },
  saveButtonText: {
    color: colors.surface,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#FFF9E6',
    margin: spacing.md,
    marginTop: 0,
    padding: spacing.lg,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFB347',
  },
  infoTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: '#8B6914',
    marginBottom: spacing.xs,
  },
  infoText: {
    fontSize: fontSize.sm,
    color: '#8B6914',
    lineHeight: 20,
  },
  versionInfo: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  versionText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
});