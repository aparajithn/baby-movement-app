export interface Exercise {
  id: string;
  name: string;
  category: 'gas' | 'core' | 'strength' | 'coordination' | 'stretch';
  ageRange: [number, number]; // months (0 = newborn, 12+ = 12 months+)
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  steps: string[];
  benefits: string[];
  safety: string[];
  tips: string[];
  isFavorite?: boolean;
}

export const exercises: Exercise[] = [
  // Gas Relief Exercises (0-6 months)
  {
    id: 'bicycle-legs',
    name: 'Bicycle Legs',
    category: 'gas',
    ageRange: [0, 6],
    duration: '1-3 min',
    difficulty: 'easy',
    description: 'Move trapped air through intestines with cycling motion',
    steps: [
      'Lay baby on back on a firm surface',
      'Hold legs at calves',
      'Slowly move one leg toward belly while extending the other',
      'Alternate in cycling motion for 30-60 seconds',
      'Repeat 2-3 times'
    ],
    benefits: ['Compresses and releases abdomen', 'Moves trapped air through intestines', 'Relieves gas discomfort'],
    safety: ['Best done 20-30 minutes after feeding', 'Stop if baby fusses'],
    tips: ['Watch for cues of relief', 'Keep movements slow and gentle']
  },
  {
    id: 'i-love-u-massage',
    name: 'I Love U Massage',
    category: 'gas',
    ageRange: [0, 6],
    duration: '3-5 min',
    difficulty: 'easy',
    description: 'Tummy massage following the path of the large intestine',
    steps: [
      '"I" stroke: Trace line down baby\'s left side from ribs to hip',
      '"L" stroke: Trace inverted L across belly right to left, then down left side',
      '"U" stroke: Trace upside-down U from right hip, across above belly button, down left side',
      'Repeat 3-5 times'
    ],
    benefits: ['Follows large intestine path', 'Moves gas and stool toward exit', 'Soothes baby'],
    safety: ['Avoid right after feeding', 'Use gentle pressure'],
    tips: ['Speak soothingly while massaging', 'Use warm hands']
  },
  {
    id: 'knees-to-chest',
    name: 'Knees to Chest',
    category: 'gas',
    ageRange: [0, 6],
    duration: '2-3 min',
    difficulty: 'easy',
    description: 'Gentle compression to release trapped gas',
    steps: [
      'Grasp both legs below knees',
      'Bring both knees toward chest',
      'Hold 3-5 seconds with gentle pressure',
      'Release and straighten legs',
      'Repeat 5-10 times or until gas passes'
    ],
    benefits: ['Compresses abdomen', 'Helps release trapped gas', 'Soothes discomfort'],
    safety: ['Be gentle', 'Stop if baby resists'],
    tips: ['Can alternate single knee to chest', 'Combine with bicycle legs']
  },
  {
    id: 'happy-baby',
    name: 'Happy Baby',
    category: 'stretch',
    ageRange: [0, 12],
    duration: '2-3 min',
    difficulty: 'easy',
    description: 'Yoga-inspired stretch that opens hips and relieves gas',
    steps: [
      'Baby lies on back',
      'Hold baby\'s feet (or let baby hold their own feet)',
      'Gently sway side to side',
      'Maintain gentle rocking motion'
    ],
    benefits: ['Opens hip muscles', 'Stimulates digestion', 'Relieves gas and colic'],
    safety: ['Keep movements gentle', 'Support baby\'s back'],
    tips: ['Great before nap time', 'Can do during diaper changes']
  },
  {
    id: 'butterfly-twist',
    name: 'Butterfly Twist',
    category: 'stretch',
    ageRange: [0, 12],
    duration: '2-3 min',
    difficulty: 'easy',
    description: 'Relaxing stretch for hips and digestion',
    steps: [
      'Baby on back',
      'Bring soles of feet together in butterfly shape',
      'Gently press feet toward stomach',
      'Twist legs side to side'
    ],
    benefits: ['Relaxation', 'Deeper sleep', 'Hip flexibility', 'Aids digestion'],
    safety: ['Gentle pressure only', 'Stop if baby fusses'],
    tips: ['Place hand on baby\'s chest for calming', 'Speak soothingly']
  },
  // Neck Strengthening & Tummy Exercises
  {
    id: 'tummy-time',
    name: 'Tummy Time',
    category: 'core',
    ageRange: [0, 6],
    duration: '3-5 min',
    difficulty: 'easy',
    description: 'Essential neck and core strengthening',
    steps: [
      'Place baby on belly on blanket or mat',
      'Stay with baby at all times',
      'Start with 3-5 minutes',
      'Gradually increase duration',
      'Use toys to encourage lifting head'
    ],
    benefits: ['Strengthens head and neck muscles', 'Prevents flat head', 'Builds core strength for crawling and walking'],
    safety: ['Supervise at all times', 'Don\'t force baby', 'Stop if distressed'],
    tips: ['Start on caregiver\'s chest', 'Transition to floor as baby gets stronger', 'Do after baby wakes up']
  },
  {
    id: 'football-hold',
    name: 'Football Hold',
    category: 'core',
    ageRange: [0, 6],
    duration: '2-5 min',
    difficulty: 'easy',
    description: 'Alternative neck strengthening for babies who resist tummy time',
    steps: [
      'Hold baby\'s body facing floor-ward under your arm',
      'Fully support belly and chest',
      'Let baby look around and lift head'
    ],
    benefits: ['Strengthens neck muscles', 'Good alternative to tummy time'],
    safety: ['Support head and neck', 'Keep baby secure'],
    tips: ['Great for babies who hate floor tummy time', 'Walk around while holding']
  },
  {
    id: 'chest-to-chest',
    name: 'Chest-to-Chest Tummy Time',
    category: 'core',
    ageRange: [0, 4],
    duration: '5-10 min',
    difficulty: 'easy',
    description: 'Bonding tummy time on caregiver\'s chest',
    steps: [
      'Lie down on your back',
      'Place baby on your chest',
      'Baby lifts head to look at you',
      'Talk or sing to baby'
    ],
    benefits: ['Strengthens neck muscles', 'Bonding time', 'Gentle introduction to tummy time'],
    safety: ['Stay awake and alert', 'Support baby'],
    tips: ['Great for newborns', 'Transition to floor as baby gets stronger']
  },
  // Crawling Preparation
  {
    id: 'hand-exercises',
    name: 'Hand Exercises',
    category: 'coordination',
    ageRange: [4, 6],
    duration: '2-3 min',
    difficulty: 'easy',
    description: 'Opening fisted hands for crawling readiness',
    steps: [
      'Have baby stretch hands and fingers while reaching for objects',
      'Massage hands with washcloth in tub',
      'Encourage open hand position'
    ],
    benefits: ['Opens fisted hands', 'Essential for crawling', 'Enables exploration'],
    safety: ['Gentle massage only', 'Watch for overstimulation'],
    tips: ['A fisted hand makes exploration tough', 'Do during bath time']
  },
  {
    id: 'assisted-crawling',
    name: 'Assisted Crawling',
    category: 'strength',
    ageRange: [6, 10],
    duration: '3-5 min',
    difficulty: 'medium',
    description: 'Help baby experience crawling motion',
    steps: [
      'Fold towel lengthwise',
      'Place baby on top',
      'Lift towel sides so baby\'s chest is supported but arms and legs dangle',
      'Move alongside baby as they crawl'
    ],
    benefits: ['Helps baby experience crawling motion', 'Builds crawling muscles'],
    safety: ['Support baby\'s weight', 'Stay close'],
    tips: ['Gradually loosen support as baby improves', 'Encourage with toys ahead']
  },
  {
    id: 'downward-dog',
    name: 'Downward Facing Dog',
    category: 'stretch',
    ageRange: [6, 10],
    duration: '1-2 min',
    difficulty: 'medium',
    description: 'Yoga-inspired stretch for crawling babies',
    steps: [
      'When baby is on hands and knees',
      'Demonstrate like peekaboo',
      'Encourage baby to lift butt in air'
    ],
    benefits: ['Flexibility', 'Motor skills', 'Mood regulation'],
    safety: ['Baby won\'t have strength until crawling stage', 'Don\'t force'],
    tips: ['Make it playful', 'Demonstrate yourself']
  },
  // Walking Preparation
  {
    id: 'sitting-on-stool',
    name: 'Sitting on Stool',
    category: 'strength',
    ageRange: [9, 12],
    duration: '3-5 min',
    difficulty: 'medium',
    description: 'Balance and standing practice',
    steps: [
      'Baby sits on stool with feet touching floor',
      'Have baby stand up',
      'Pick up toy from floor',
      'Sit back down'
    ],
    benefits: ['Balance practice', 'Weight-bearing on feet', 'Standing practice'],
    safety: ['Adult must be nearby at all times', 'Use stable stool'],
    tips: ['Make it a game', 'Praise efforts']
  },
  {
    id: 'bounce-baby',
    name: 'Bounce Baby',
    category: 'strength',
    ageRange: [9, 12],
    duration: '2-3 min',
    difficulty: 'easy',
    description: 'Leg strengthening and balance practice',
    steps: [
      'Baby stands on your lap',
      'Hold baby\'s hands',
      'Bounce and move arms up and down'
    ],
    benefits: ['Strengthens legs', 'Balance practice', 'Fun for baby'],
    safety: ['Support baby\'s hands throughout', 'Gentle bouncing'],
    tips: ['Sing while bouncing', 'Baby loves this!']
  },
  {
    id: 'cruising',
    name: 'Cruising',
    category: 'strength',
    ageRange: [10, 14],
    duration: '5-10 min',
    difficulty: 'medium',
    description: 'Walking along furniture with support',
    steps: [
      'Baby holds furniture',
      'Moves along it',
      'Hold one of baby\'s hands while other stays on furniture'
    ],
    benefits: ['Balance', 'Confidence for independent walking'],
    safety: ['Pad sharp furniture corners', 'Stay close'],
    tips: ['Baby gains confidence to let go', 'Celebrate small steps']
  },
  // Hand-Eye Coordination
  {
    id: 'catch-the-toy',
    name: 'Catch the Toy',
    category: 'coordination',
    ageRange: [3, 6],
    duration: '2-3 min',
    difficulty: 'easy',
    description: 'Reaching and grasping practice',
    steps: [
      'Tie soft toy to ribbon',
      'Dangle in front of baby',
      'Make it move',
      'Encourage baby to grab'
    ],
    benefits: ['Hand-eye coordination', 'Balance as baby leans to grab'],
    safety: ['Secure toy tightly', 'Supervise closely'],
    tips: ['Use colorful toys', 'Move slowly at first']
  },
  {
    id: 'bubble-gaze',
    name: 'Bubble Gaze',
    category: 'coordination',
    ageRange: [3, 6],
    duration: '3-5 min',
    difficulty: 'easy',
    description: 'Visual tracking with bubbles',
    steps: [
      'Place baby in bouncy chair',
      'Blow bubbles',
      'Watch baby follow with eyes'
    ],
    benefits: ['Visual tracking', 'Hand-eye coordination foundation'],
    safety: ['Use baby-safe bubbles', 'Don\'t blow directly at baby'],
    tips: ['Babies love this!', 'Great for calm moments']
  }
];

export function getExercisesByAge(ageMonths: number): Exercise[] {
  return exercises.filter(ex => 
    ageMonths >= ex.ageRange[0] && ageMonths <= ex.ageRange[1]
  );
}

export function getExercisesByCategory(category: string): Exercise[] {
  if (category === 'all') return exercises;
  return exercises.filter(ex => ex.category === category);
}

export function searchExercises(query: string): Exercise[] {
  const lowerQuery = query.toLowerCase();
  return exercises.filter(ex =>
    ex.name.toLowerCase().includes(lowerQuery) ||
    ex.description.toLowerCase().includes(lowerQuery) ||
    ex.benefits.some(b => b.toLowerCase().includes(lowerQuery))
  );
}
