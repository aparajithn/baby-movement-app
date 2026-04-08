import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface BabyProfile {
  name: string;
  birthDate: string;
}

interface AppContextType {
  baby: BabyProfile;
  updateBaby: (baby: BabyProfile) => void;
  favoriteExercises: string[];
  toggleFavorite: (exerciseId: string) => void;
  completedExercises: string[];
  markCompleted: (exerciseId: string) => void;
  milestoneProgress: Record<string, boolean>;
  updateMilestone: (milestoneId: string, achieved: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const BABY_KEY = '@baby_profile';
const FAVORITES_KEY = '@favorite_exercises';
const COMPLETED_KEY = '@completed_exercises';
const MILESTONES_KEY = '@milestone_progress';

export function AppProvider({ children }: { children: ReactNode }) {
  const [baby, setBaby] = useState<BabyProfile>({ name: 'Baby', birthDate: new Date().toISOString() });
  const [favoriteExercises, setFavoriteExercises] = useState<string[]>([]);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [milestoneProgress, setMilestoneProgress] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const babyData = await AsyncStorage.getItem(BABY_KEY);
      if (babyData) {
        setBaby(JSON.parse(babyData));
      }

      const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
      if (favorites) {
        setFavoriteExercises(JSON.parse(favorites));
      }

      const completed = await AsyncStorage.getItem(COMPLETED_KEY);
      if (completed) {
        setCompletedExercises(JSON.parse(completed));
      }

      const milestones = await AsyncStorage.getItem(MILESTONES_KEY);
      if (milestones) {
        setMilestoneProgress(JSON.parse(milestones));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBaby = async (newBaby: BabyProfile) => {
    setBaby(newBaby);
    try {
      await AsyncStorage.setItem(BABY_KEY, JSON.stringify(newBaby));
    } catch (error) {
      console.error('Error saving baby profile:', error);
    }
  };

  const toggleFavorite = async (exerciseId: string) => {
    const newFavorites = favoriteExercises.includes(exerciseId)
      ? favoriteExercises.filter(id => id !== exerciseId)
      : [...favoriteExercises, exerciseId];
    
    setFavoriteExercises(newFavorites);
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const markCompleted = async (exerciseId: string) => {
    if (!completedExercises.includes(exerciseId)) {
      const newCompleted = [...completedExercises, exerciseId];
      setCompletedExercises(newCompleted);
      try {
        await AsyncStorage.setItem(COMPLETED_KEY, JSON.stringify(newCompleted));
      } catch (error) {
        console.error('Error saving completed:', error);
      }
    }
  };

  const updateMilestone = async (milestoneId: string, achieved: boolean) => {
    const newProgress = { ...milestoneProgress, [milestoneId]: achieved };
    setMilestoneProgress(newProgress);
    try {
      await AsyncStorage.setItem(MILESTONES_KEY, JSON.stringify(newProgress));
    } catch (error) {
      console.error('Error saving milestone progress:', error);
    }
  };

  if (isLoading) {
    return null; // Could show a loading screen here
  }

  return (
    <AppContext.Provider
      value={{
        baby,
        updateBaby,
        favoriteExercises,
        toggleFavorite,
        completedExercises,
        markCompleted,
        milestoneProgress,
        updateMilestone,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
