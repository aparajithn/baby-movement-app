export interface RoutineExercise {
  exerciseId: string;
  durationSeconds: number;
  order: number;
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  exercises: RoutineExercise[];
  totalDuration: string;
  ageRange: [number, number];
  icon: string;
}

export const routines: Routine[] = [
  {
    id: 'gas-relief',
    name: 'Gas Relief',
    description: 'Soothe a gassy baby with these gentle movements',
    icon: '💨',
    ageRange: [0, 6],
    totalDuration: '~10 min',
    exercises: [
      { exerciseId: 'bicycle-legs', durationSeconds: 60, order: 1 },
      { exerciseId: 'i-love-u-massage', durationSeconds: 180, order: 2 },
      { exerciseId: 'knees-to-chest', durationSeconds: 120, order: 3 },
      { exerciseId: 'tummy-time', durationSeconds: 120, order: 4 }
    ]
  },
  {
    id: 'tummy-time',
    name: 'Tummy Time',
    description: 'Build neck and core strength',
    icon: '🍼',
    ageRange: [0, 6],
    totalDuration: '~8 min',
    exercises: [
      { exerciseId: 'chest-to-chest', durationSeconds: 180, order: 1 },
      { exerciseId: 'tummy-time', durationSeconds: 180, order: 2 },
      { exerciseId: 'football-hold', durationSeconds: 120, order: 3 }
    ]
  },
  {
    id: 'morning',
    name: 'Morning Routine',
    description: 'Gentle wake-up stretches and movement',
    icon: '☀️',
    ageRange: [0, 12],
    totalDuration: '~12 min',
    exercises: [
      { exerciseId: 'happy-baby', durationSeconds: 120, order: 1 },
      { exerciseId: 'butterfly-twist', durationSeconds: 120, order: 2 },
      { exerciseId: 'bicycle-legs', durationSeconds: 60, order: 3 },
      { exerciseId: 'tummy-time', durationSeconds: 180, order: 4 },
      { exerciseId: 'catch-the-toy', durationSeconds: 120, order: 5 }
    ]
  },
  {
    id: 'bedtime',
    name: 'Bedtime Routine',
    description: 'Calming exercises before sleep',
    icon: '🌙',
    ageRange: [0, 12],
    totalDuration: '~10 min',
    exercises: [
      { exerciseId: 'butterfly-twist', durationSeconds: 120, order: 1 },
      { exerciseId: 'happy-baby', durationSeconds: 120, order: 2 },
      { exerciseId: 'i-love-u-massage', durationSeconds: 180, order: 3 },
      { exerciseId: 'bubble-gaze', durationSeconds: 180, order: 4 }
    ]
  }
];

export function getRoutineById(id: string): Routine | undefined {
  return routines.find(r => r.id === id);
}
