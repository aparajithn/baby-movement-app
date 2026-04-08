import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../theme';

export function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Baby Movement App v1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 16,
  },
});