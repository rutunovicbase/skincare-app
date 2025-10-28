import { createRef } from 'react';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { CommonActions } from '@react-navigation/native';

export const hp = val => heightPercentageToDP(val);
export const wp = val => widthPercentageToDP(val);
export const fontSize = val => RFValue(val, 812);

export const navigationRef = createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export const goBack = () => navigationRef.current?.goBack();

export const commonAction = (name, params) => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: name, params: params }],
    }),
  );
};

export const resetStack = (name, params) =>
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: name, params: params }],
    }),
  );

export const serializeDate = (date: any): string | null => {
  if (!date) return null;

  if (typeof date.toDate === 'function') {
    return date.toDate().toISOString();
  }

  if (date instanceof Date) {
    return date.toISOString();
  }

  if (typeof date === 'number') {
    const ms = date < 1e12 ? date * 1000 : date;
    return new Date(ms).toISOString();
  }

  if (typeof date === 'string') {
    const parsed = new Date(date);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString();
    }
    return date;
  }

  return String(date);
};
