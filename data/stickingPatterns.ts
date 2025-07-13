import { StickingPattern } from "../modals/StickingPattern";

export const defaultPatterns: StickingPattern[] = [
  {
    'id': '1',
    'name': 'Single Stroke Roll',
    'notes': [
      { 'limb': 'R', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': true },
      { 'limb': 'L', 'accent': false }
    ],
    'tempo': 120,
    'description': 'Alternating sticking (R, L, R, L). The foundation of all drumming.',
    'importance': 'high',
    'difficulty': 'very easy',
    'backgroundImage': '1.png'
  },
  {
    'id': '2',
    'name': 'Single Stroke Four',
    'notes': [
      { 'limb': 'R', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': true }
    ],
    'tempo': 110,
    'description': 'A four-note roll with accents on the first and last notes.',
    'importance': 'medium',
    'difficulty': 'easy',
    'backgroundImage': '2.png'
  },
  {
    'id': '3',
    'name': 'Single Stroke Seven',
    'notes': [
      { 'limb': 'R', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': true }
    ],
    'tempo': 100,
    'description': 'A seven-note roll, played as sextuplets with a final quarter note.',
    'importance': 'medium',
    'difficulty': 'easy',
    'backgroundImage': '3.png'
  },
  {
    'id': '4',
    'name': 'Multiple Bounce Roll',
    'notes': [
      { 'limb': 'R', 'accent': true },
      { 'limb': 'L', 'accent': true }
    ],
    'tempo': 100,
    'description': 'Also known as a buzz roll. A sustained sound from multiple bounces per stroke.',
    'importance': 'high',
    'difficulty': 'easy',
    'backgroundImage': '4.png'
  },
  {
    'id': '5',
    'name': 'Double Stroke Roll',
    'notes': [
      { 'limb': 'R', 'accent': true },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': true },
      { 'limb': 'L', 'accent': false }
    ],
    'tempo': 110,
    'description': 'Two strokes per hand, alternating (RR, LL). Also called the Long Roll.',
    'importance': 'high',
    'difficulty': 'easy',
    'backgroundImage': '5.png'
  },
  {
    'id': '6',
    'name': 'Five Stroke Roll',
    'notes': [
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': true }
    ],
    'tempo': 90,
    'description': 'A short roll of five notes, ending with an accent.',
    'importance': 'high',
    'difficulty': 'easy',
    'backgroundImage': '1.png'
  },
  {
    'id': '7',
    'name': 'Six Stroke Roll',
    'notes': [
      { 'limb': 'R', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': true }
    ],
    'tempo': 95,
    'description': 'A popular roll with accents on the first and last notes.',
    'importance': 'high',
    'difficulty': 'intermediate',
    'backgroundImage': '2.png'
  },
  {
    'id': '8',
    'name': 'Seven Stroke Roll',
    'notes': [
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': true }
    ],
    'tempo': 90,
    'description': 'A seven-note roll, typically ending with an accent on the last note.',
    'importance': 'medium',
    'difficulty': 'intermediate',
    'backgroundImage': '3.png'
  },
  {
    'id': '9',
    'name': 'Nine Stroke Roll',
    'notes': [
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': true }
    ],
    'tempo': 85,
    'description': 'Four pairs of doubles followed by a single accented note.',
    'importance': 'medium',
    'difficulty': 'intermediate',
    'backgroundImage': '4.png'
  },
  {
    'id': '10',
    'name': 'Ten Stroke Roll',
    'notes': [
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': true },
      { 'limb': 'L', 'accent': false }
    ],
    'tempo': 80,
    'description': 'Four doubles followed by two accented singles.',
    'importance': 'low',
    'difficulty': 'intermediate',
    'backgroundImage': '5.png'
  },
  {
    'id': '11',
    'name': 'Eleven Stroke Roll',
    'notes': [
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': true }
    ],
    'tempo': 80,
    'description': 'Five pairs of doubles followed by a single accented note.',
    'importance': 'low',
    'difficulty': 'intermediate',
    'backgroundImage': '1.png'
  },
  {
    'id': '12',
    'name': 'Thirteen Stroke Roll',
    'notes': [
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': true }
    ],
    'tempo': 75,
    'description': 'Six pairs of doubles followed by a single accented note.',
    'importance': 'low',
    'difficulty': 'intermediate',
    'backgroundImage': '2.png'
  },
  {
    'id': '13',
    'name': 'Fifteen Stroke Roll',
    'notes': [
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': true }
    ],
    'tempo': 70,
    'description': 'Seven pairs of doubles followed by a single accented note.',
    'importance': 'low',
    'difficulty': 'intermediate',
    'backgroundImage': '3.png'
  },
  {
    'id': '14',
    'name': 'Seventeen Stroke Roll',
    'notes': [
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': true }
    ],
    'tempo': 70,
    'description': 'Eight pairs of doubles followed by a single accented note.',
    'importance': 'low',
    'difficulty': 'intermediate',
    'backgroundImage': '4.png'
  },
  {
    'id': '15',
    'name': 'Single Paradiddle',
    'notes': [
      { 'limb': 'R', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': true },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false }
    ],
    'tempo': 100,
    'description': 'Combines single and double strokes into a foundational pattern.',
    'importance': 'high',
    'difficulty': 'easy',
    'backgroundImage': '5.png'
  },
  {
    'id': '16',
    'name': 'Double Paradiddle',
    'notes': [
      { 'limb': 'R', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': true },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false }
    ],
    'tempo': 90,
    'description': 'A six-note paradiddle pattern (RLRLRR).',
    'importance': 'high',
    'difficulty': 'intermediate',
    'backgroundImage': '1.png'
  },
  {
    'id': '17',
    'name': 'Triple Paradiddle',
    'notes': [
      { 'limb': 'R', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false }
    ],
    'tempo': 85,
    'description': 'An eight-note paradiddle with six alternating singles followed by a double.',
    'importance': 'medium',
    'difficulty': 'intermediate',
    'backgroundImage': '2.png'
  },
  {
    'id': '18',
    'name': 'Paradiddle-Diddle',
    'notes': [
      { 'limb': 'R', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': true },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false }
    ],
    'tempo': 95,
    'description': 'A six-note pattern combining paradiddles and doubles.',
    'importance': 'medium',
    'difficulty': 'difficult',
    'backgroundImage': '3.png'
  },
  {
    'id': '19',
    'name': 'Flam',
    'notes': [
      { 'limb': 'RL', 'accent': true },
      { 'limb': 'RL', 'accent': true }
    ],
    'tempo': 80,
    'description': 'A grace note played slightly before the primary note.',
    'importance': 'high',
    'difficulty': 'easy',
    'backgroundImage': '4.png'
  },
  {
    'id': '20',
    'name': 'Flam Accent',
    'notes': [
      { 'limb': 'RL', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'RL', 'accent': true },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false }
    ],
    'tempo': 85,
    'description': 'A three-note pattern starting with a flam.',
    'importance': 'high',
    'difficulty': 'intermediate',
    'backgroundImage': '5.png'
  },
  {
    'id': '21',
    'name': 'Flam Tap',
    'notes': [
      { 'limb': 'RL', 'accent': true },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'RL', 'accent': true },
      { 'limb': 'L', 'accent': false }
    ],
    'tempo': 90,
    'description': 'A flam followed by a single tap, alternating hands.',
    'importance': 'high',
    'difficulty': 'intermediate',
    'backgroundImage': '1.png'
  },
  {
    'id': '22',
    'name': 'Flamacue',
    'notes': [
      { 'limb': 'RL', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'RL', 'accent': true }
    ],
    'tempo': 80,
    'description': 'A five-note pattern with two flams and an accent.',
    'importance': 'medium',
    'difficulty': 'difficult',
    'backgroundImage': '2.png'
  },
  {
    'id': '23',
    'name': 'Flam Paradiddle',
    'notes': [
      { 'limb': 'RL', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'RL', 'accent': true },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false }
    ],
    'tempo': 85,
    'description': 'A standard paradiddle with a flam on the first note.',
    'importance': 'medium',
    'difficulty': 'intermediate',
    'backgroundImage': '3.png'
  },
  {
    'id': '24',
    'name': 'Single Flammed Mill',
    'notes': [
      { 'limb': 'RL', 'accent': true },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': true },
      { 'limb': 'RL', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': true }
    ],
    'tempo': 80,
    'description': 'A four-note pattern with a flam on the first note, played with inverted sticking.',
    'importance': 'low',
    'difficulty': 'difficult',
    'backgroundImage': '4.png'
  },
  {
    'id': '25',
    'name': 'Flam Paradiddle-Diddle',
    'notes': [
      { 'limb': 'RL', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'L', 'accent': false }
    ],
    'tempo': 80,
    'description': 'A paradiddle-diddle starting with a flam.',
    'importance': 'medium',
    'difficulty': 'difficult',
    'backgroundImage': '5.png'
  },
  {
    'id': '26',
    'name': 'Pataflafla',
    'notes': [
      { 'limb': 'RL', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'RL', 'accent': true }
    ],
    'tempo': 75,
    'description': 'A four-note pattern with flams on the first and last notes.',
    'importance': 'low',
    'difficulty': 'intermediate',
    'backgroundImage': '1.png'
  },
  {
    'id': '27',
    'name': 'Swiss Army Triplet',
    'notes': [
      { 'limb': 'RL', 'accent': true },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'RL', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false }
    ],
    'tempo': 85,
    'description': 'A three-note pattern that feels like a flam followed by a tap.',
    'importance': 'medium',
    'difficulty': 'intermediate',
    'backgroundImage': '2.png'
  },
  {
    'id': '28',
    'name': 'Inverted Flam Tap',
    'notes': [
      { 'limb': 'R', 'accent': false },
      { 'limb': 'RL', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'RL', 'accent': true }
    ],
    'tempo': 90,
    'description': 'Flam taps where the flam lands on the upbeat.',
    'importance': 'low',
    'difficulty': 'difficult',
    'backgroundImage': '3.png'
  },
  {
    'id': '29',
    'name': 'Flam Drag',
    'notes': [
      { 'limb': 'RL', 'accent': true },
      { 'limb': 'RL', 'accent': false },
      { 'limb': 'R', 'accent': false }
    ],
    'tempo': 70,
    'description': 'A flam followed by a drag and a tap.',
    'importance': 'low',
    'difficulty': 'difficult',
    'backgroundImage': '4.png'
  },
  {
    'id': '30',
    'name': 'Drag',
    'notes': [
      { 'limb': 'RK', 'accent': true },
      { 'limb': 'LK', 'accent': true }
    ],
    'tempo': 85,
    'description': 'Two grace notes (a double stroke) played before a primary note.',
    'importance': 'high',
    'difficulty': 'intermediate',
    'backgroundImage': '5.png'
  },
  {
    'id': '31',
    'name': 'Single Drag Tap',
    'notes': [
      { 'limb': 'RK', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'LK', 'accent': true },
      { 'limb': 'R', 'accent': false }
    ],
    'tempo': 80,
    'description': 'A drag followed by a tap, alternating hands.',
    'importance': 'medium',
    'difficulty': 'intermediate',
    'backgroundImage': '1.png'
  },
  {
    'id': '32',
    'name': 'Double Drag Tap',
    'notes': [
      { 'limb': 'RK', 'accent': true },
      { 'limb': 'RK', 'accent': false },
      { 'limb': 'L', 'accent': true },
      { 'limb': 'LK', 'accent': false },
      { 'limb': 'LK', 'accent': true },
      { 'limb': 'R', 'accent': false }
    ],
    'tempo': 75,
    'description': 'Two drags followed by a tap.',
    'importance': 'medium',
    'difficulty': 'difficult',
    'backgroundImage': '2.png'
  },
  {
    'id': '33',
    'name': 'Lesson 25',
    'notes': [
      { 'limb': 'RK', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': true },
      { 'limb': 'LK', 'accent': true },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': true }
    ],
    'tempo': 75,
    'description': 'A three-note pattern that alternates between drags and taps.',
    'importance': 'medium',
    'difficulty': 'intermediate',
    'backgroundImage': '3.png'
  },
  {
    'id': '34',
    'name': 'Single Dragadiddle',
    'notes': [
      { 'limb': 'RK', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false }
    ],
    'tempo': 80,
    'description': 'A paradiddle with the first note replaced by a drag.',
    'importance': 'low',
    'difficulty': 'difficult',
    'backgroundImage': '4.png'
  },
  {
    'id': '35',
    'name': 'Drag Paradiddle #1',
    'notes': [
      { 'limb': 'R', 'accent': true },
      { 'limb': 'RK', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false }
    ],
    'tempo': 75,
    'description': 'An accented single followed by a drag within a paradiddle sticking.',
    'importance': 'low',
    'difficulty': 'difficult',
    'backgroundImage': '5.png'
  },
  {
    'id': '36',
    'name': 'Drag Paradiddle #2',
    'notes': [
      { 'limb': 'R', 'accent': true },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'RK', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false }
    ],
    'tempo': 75,
    'description': 'Two singles followed by a drag within a paradiddle sticking.',
    'importance': 'low',
    'difficulty': 'crazy',
    'backgroundImage': '1.png'
  },
  {
    'id': '37',
    'name': 'Single Ratamacue',
    'notes': [
      { 'limb': 'RK', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': true },
      { 'limb': 'L', 'accent': false }
    ],
    'tempo': 80,
    'description': 'A four-note pattern starting with a drag.',
    'importance': 'medium',
    'difficulty': 'difficult',
    'backgroundImage': '2.png'
  },
  {
    'id': '38',
    'name': 'Double Ratamacue',
    'notes': [
      { 'limb': 'RK', 'accent': true },
      { 'limb': 'RK', 'accent': false },
      { 'limb': 'L', 'accent': true },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': true }
    ],
    'tempo': 70,
    'description': 'A single ratalamacue with an extra drag at the beginning.',
    'importance': 'low',
    'difficulty': 'difficult',
    'backgroundImage': '3.png'
  },
  {
    'id': '39',
    'name': 'Triple Ratamacue',
    'notes': [
      { 'limb': 'RK', 'accent': true },
      { 'limb': 'RK', 'accent': false },
      { 'limb': 'RK', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': true },
      { 'limb': 'L', 'accent': false }
    ],
    'tempo': 65,
    'description': 'A single ratalamacue with two extra drags at the beginning.',
    'importance': 'low',
    'difficulty': 'crazy',
    'backgroundImage': '4.png'
  },
  {
    'id': '40',
    'name': 'Rudimental Pyramid',
    'notes': [
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': true },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': true },
      { 'limb': 'L', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': true },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'R', 'accent': false },
      { 'limb': 'L', 'accent': true },
      { 'limb': 'L', 'accent': false }
    ],
    'tempo': 80,
    'description': 'Mixes singles and doubles for advanced control.',
    'importance': 'medium',
    'difficulty': 'crazy',
    'backgroundImage': '5.png'
  }
];
