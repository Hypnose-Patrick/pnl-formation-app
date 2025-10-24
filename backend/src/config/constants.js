/**
 * Application Constants
 * Centralized configuration for the ProfilPro 5D application
 */

export const DISC_DIMENSIONS = {
  D: 'Dominance',
  I: 'Influence',
  S: 'Steadiness',
  C: 'Conscientiousness',
};

export const RIASEC_DIMENSIONS = {
  R: 'Realistic',
  I: 'Investigative',
  A: 'Artistic',
  S: 'Social',
  E: 'Enterprising',
  C: 'Conventional',
};

export const ENNEAGRAM_TYPES = {
  1: 'The Reformer',
  2: 'The Helper',
  3: 'The Achiever',
  4: 'The Individualist',
  5: 'The Investigator',
  6: 'The Loyalist',
  7: 'The Enthusiast',
  8: 'The Challenger',
  9: 'The Peacemaker',
};

export const ZODIAC_SIGNS = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

export const ASTRO_ELEMENTS = ['Fire', 'Earth', 'Air', 'Water'];

export const TIBETAN_ELEMENTS = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];

export const TIBETAN_ANIMALS = [
  'Rat',
  'Ox',
  'Tiger',
  'Rabbit',
  'Dragon',
  'Snake',
  'Horse',
  'Goat',
  'Monkey',
  'Rooster',
  'Dog',
  'Pig',
];

export const QUESTIONNAIRE_CONFIG = {
  TOTAL_QUESTIONS: 35,
  ESTIMATED_DURATION_MINUTES: 15,
  MIN_QUESTIONS_FOR_PROFILE: 30,
};

export const PROFILE_GENERATION_CONFIG = {
  MIN_WORD_COUNT: 1500,
  TARGET_WORD_COUNT: 2500,
  MAX_WORD_COUNT: 3500,
  MIN_CONFIDENCE_SCORE: 0.7,
};

export const EXPORT_FORMATS = {
  PDF: 'pdf',
  WORD: 'word',
  MARKDOWN: 'markdown',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
};

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

export default {
  DISC_DIMENSIONS,
  RIASEC_DIMENSIONS,
  ENNEAGRAM_TYPES,
  ZODIAC_SIGNS,
  ASTRO_ELEMENTS,
  TIBETAN_ELEMENTS,
  TIBETAN_ANIMALS,
  QUESTIONNAIRE_CONFIG,
  PROFILE_GENERATION_CONFIG,
  EXPORT_FORMATS,
  HTTP_STATUS,
  ERROR_CODES,
  USER_ROLES,
};
