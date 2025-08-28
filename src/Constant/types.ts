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
  doctor: string;
  specialization: string;
  Concern: string[];
  date: string;
  rating: number;
  isComplete?: boolean;
  avatar: ImageSourcePropType;
  isCancelled?: boolean;
};

export type MedicineDetails = {
  name: string;
  quantitiy: string;
  mrp: number;
  discount?: number;
};

export type BillingProps = {
  total: number;
  discount: number;
  taxes: number;
  delivery: number;
};
