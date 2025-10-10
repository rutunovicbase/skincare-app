import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { ImageSourcePropType } from 'react-native';

export interface CustomTabNavigationOptions extends BottomTabNavigationOptions {
  icon: ImageSourcePropType;
}

export interface TabButtonProps {
  onPress: () => void;
  icon: React.ReactNode;
}

export interface TabBarProps {
  state: any;
  descriptors: any;
}

export interface AnimatedTabBarIconProps {
  focused: boolean;
  icon: {
    filled: ImageSourcePropType;
    outline: ImageSourcePropType;
  };
}

export type Consultation = {
  id: string;
  createdAt: string;
  createdBy: string;
  date: string;
  disease: string;
  duration: number;
  notes: string;
  patientId: string;
  patientName: string;
  profilePhotoURL: string;
  sessionId: string;
  status: 'completed' | 'pending' | 'cancelled' | string;
  time: string;
  type: 'New' | 'Follow-up' | string;
  doctorId: string;
  doctorName: string;
  prescriptionId: string;
  aiConsultationId: string;
  doctorProfilePhoto: string;
};

export type MedicineDetails = {
  name: string;
  quantitiy?: string;
  mrp?: number;
  discount?: number;
  dosage: string;
};

export type OrderStatus = {
  title: string;
  status: string;
  date?: string;
  onPress: () => void;
};

export interface BillingProps {
  total: number;
  discount: number;
  taxes: number;
  delivery: number;
  grandTotal?: number;
  setGrandTotal?: (value: number) => void;
}

export type RootStackParamList = {
  OTPVerification: { confirmation: any };
  Onboarding: undefined;
};

export type AIConsultation = {
  description: string;
  problem: string;
  recommended_action: string;
  severity: string;
};

export type SkinScanItem = {
  aiConsultation: AIConsultation[];
  createdAt: string;
};

export type Medication = {
  date: string;
  dosage: string;
  duration?: string;
  frequency: string;
  medication: string;
  notes: string;
  patientAvatar: string;
  prescribedBy?: string;
  prescribedByName: string;
  prescribedDate: string;
  timeOfDay: string;
  when: string;
  price: number;
};

export type OrderDetailsData = {
  id: string;
  createdAt: string;
  createdBy: string;
  patientId: string;
  patientName: string;
  sessionId: string;
  status: 'active' | 'inactive' | string;
  totalMedications: number;
  doctorConsultationReport: string;
  medications: Medication[];
  totalPrice: number;
};
