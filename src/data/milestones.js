export interface Milestone {
  id: string;
  text: string;
  category: 'movement' | 'social' | 'language' | 'cognitive';
}

export interface AgeMilestone {
  ageMonths: number;
  label: string;
  milestones: Milestone[];
}

export const ageMilestones: AgeMilestone[] = [
  {
    ageMonths: 2,
    label: '2 Months',
    milestones: [
      { id: '2-1', text: 'Holds head up when on tummy', category: 'movement' },
      { id: '2-2', text: 'Moves both arms and legs', category: 'movement' },
      { id: '2-3', text: 'Opens hands briefly', category: 'movement' },
      { id: '2-4', text: 'Begins to smile at people', category: 'social' },
      { id: '2-5', text: 'Can briefly calm self', category: 'social' },
      { id: '2-6', text: 'Tries to look at parent', category: 'social' },
      { id: '2-7', text: 'Coos, makes gurgling sounds', category: 'language' },
      { id: '2-8', text: 'Turns head toward sounds', category: 'language' },
      { id: '2-9', text: 'Pays attention to faces', category: 'cognitive' },
      { id: '2-10', text: 'Follows things with eyes', category: 'cognitive' },
    ]
  },
  {
    ageMonths: 4,
    label: '4 Months',
    milestones: [
      { id: '4-1', text: 'Holds head steady without support', category: 'movement' },
      { id: '4-2', text: 'Holds a toy when you put it in their hand', category: 'movement' },
      { id: '4-3', text: 'Moves arm to swing at toys', category: 'movement' },
      { id: '4-4', text: 'Brings hands to mouth', category: 'movement' },
      { id: '4-5', text: 'Pushes up onto elbows/forearms when on tummy', category: 'movement' },
      { id: '4-6', text: 'Smiles on their own to get your attention', category: 'social' },
      { id: '4-7', text: 'Chuckles when you try to make them laugh', category: 'social' },
      { id: '4-8', text: 'Looks at you, moves, or makes sounds for attention', category: 'social' },
      { id: '4-9', text: 'Makes sounds like "ooo" and "aah"', category: 'language' },
      { id: '4-10', text: 'Makes sounds back when you talk', category: 'language' },
    ]
  },
  {
    ageMonths: 6,
    label: '6 Months',
    milestones: [
      { id: '6-1', text: 'Rolls from tummy to back', category: 'movement' },
      { id: '6-2', text: 'Pushes up with straight arms when on tummy', category: 'movement' },
      { id: '6-3', text: 'Leans on hands to support self when sitting', category: 'movement' },
      { id: '6-4', text: 'Knows familiar people', category: 'social' },
      { id: '6-5', text: 'Likes to look at self in mirror', category: 'social' },
      { id: '6-6', text: 'Laughs', category: 'social' },
      { id: '6-7', text: 'Takes turns making sounds with you', category: 'language' },
      { id: '6-8', text: 'Blows raspberries', category: 'language' },
      { id: '6-9', text: 'Puts things in mouth to explore', category: 'cognitive' },
      { id: '6-10', text: 'Reaches to grab a toy they want', category: 'cognitive' },
    ]
  },
  {
    ageMonths: 9,
    label: '9 Months',
    milestones: [
      { id: '9-1', text: 'Gets to a sitting position by themselves', category: 'movement' },
      { id: '9-2', text: 'Moves things from one hand to the other', category: 'movement' },
      { id: '9-3', text: 'Uses fingers to "rake" food toward self', category: 'movement' },
      { id: '9-4', text: 'Sits without support', category: 'movement' },
      { id: '9-5', text: 'Shows several facial expressions', category: 'social' },
      { id: '9-6', text: 'Looks when you call their name', category: 'social' },
      { id: '9-7', text: 'Reacts when you leave', category: 'social' },
      { id: '9-8', text: 'Smiles or laughs when you play peek-a-boo', category: 'social' },
      { id: '9-9', text: 'Makes different sounds like "mamamama"', category: 'language' },
      { id: '9-10', text: 'Lifts arms up to be picked up', category: 'language' },
    ]
  },
  {
    ageMonths: 12,
    label: '12 Months',
    milestones: [
      { id: '12-1', text: 'Pulls to stand', category: 'movement' },
      { id: '12-2', text: 'Drinks from a cup without a lid', category: 'movement' },
      { id: '12-3', text: 'Picks things up between thumb and finger', category: 'movement' },
      { id: '12-4', text: 'May take a few steps on their own', category: 'movement' },
      { id: '12-5', text: 'Plays games like pat-a-cake', category: 'social' },
      { id: '12-6', text: 'Shows shyness around strangers', category: 'social' },
      { id: '12-7', text: 'Waves "bye-bye"', category: 'language' },
      { id: '12-8', text: 'Calls parent "mama" or "dada"', category: 'language' },
      { id: '12-9', text: 'Looks for things they see you hide', category: 'cognitive' },
      { id: '12-10', text: 'Bangs two things together', category: 'cognitive' },
    ]
  },
];

export function getMilestonesByAge(ageMonths: number): AgeMilestone | undefined {
  return ageMilestones.find(m => m.ageMonths === ageMonths);
}

export function getNextMilestoneAge(ageMonths: number): number | null {
  const ages = ageMilestones.map(m => m.ageMonths);
  const next = ages.find(a => a > ageMonths);
  return next ?? null;
}