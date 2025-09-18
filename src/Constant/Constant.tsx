import { icons } from './Icons';

export const genders = ['Male', 'Female', 'Other'];

export const languages = [
  { label: 'English', code: 'en', icon: 'A' },
  { label: 'हिंदी ', code: 'hi', icon: 'अ' },
  { label: 'ગુજરાતી', code: 'gu', icon: 'અ' },
];

export const ONBOARDING_DATA = [
  {
    key: '1',
    titleKey: 'InstantAnalysis',
    descriptionKey: 'InstantAnalysisInfo',
    image: icons.frame1,
  },
  {
    key: '2',
    titleKey: 'OneOnOneConsultations',
    descriptionKey: 'OneOnOneConsultationsInfo',
    image: icons.frame2,
  },
  {
    key: '3',
    titleKey: 'VideoCallWithSpecialist',
    descriptionKey: 'VideoCallWithSpecialistInfo',
    image: icons.frame3,
  },
];

export const yourLifestyle = [
  {
    id: 'early_bird',
    title: 'Early Bird',
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
  },
  {
    id: 'irregular_sleeper',
    title: 'Irregular Sleeper',
  },
  {
    id: 'short_sleeper',
    title: 'Short Sleeper',
  },
  {
    id: 'long_sleeper',
    title: 'Long Sleeper',
  },
  {
    id: 'interrupted_sleep',
    title: 'Interrupted Sleep',
  },
];

export const dietaryPreferences = [
  {
    id: 'balanced_diet',
    title: 'Balanced Diet',
  },
  {
    id: 'high_sugar_intake',
    title: 'High Sugar Intake',
  },
  {
    id: 'high_dairy_consumption',
    title: 'High Dairy Consumption',
  },
  {
    id: 'oily_fried_foods',
    title: 'Oily / Fried Foods',
  },
  {
    id: 'processed_junk_food',
    title: 'Processed / Junk Food',
  },
  {
    id: 'spicy_food_lover',
    title: 'Spicy Food Lover',
  },
  {
    id: 'vegan_vegetarian_diet',
    title: 'Vegan / Vegetarian Diet',
  },
  {
    id: 'high_protein_keto',
    title: 'High Protein / Keto',
  },
];

export const yourStressLevel = [
  {
    id: 'zen_mode',
    title: 'Zen Mode (Low Stress)',
  },
  {
    id: 'breezy_hustle',
    title: 'Breezy Hustle (Mild Stress)',
  },
  {
    id: 'tidal_task',
    title: 'Tidal Task (Moderate Stress)',
  },
  {
    id: 'pressure_cooker',
    title: 'Pressure Cooker (High Stress)',
  },
  {
    id: 'storm_zone',
    title: 'Storm Zone (Very High Stress)',
  },
];

export const cancelReasons = [
  {
    key: '1',
    title: 'Ordered the wrong medicine/product',
  },
  {
    key: '2',
    title: 'No longer need it',
  },
  {
    key: '3',
    title: 'Delivery time is too long',
  },
  {
    key: '4',
    title: 'Concern about product quality or authenticity',
  },
  {
    key: '5',
    title: 'Duplicate order by mistake',
  },
  {
    key: '6',
    title: 'Payment issue',
  },
];
