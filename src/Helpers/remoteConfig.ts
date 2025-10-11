import remoteConfig from '@react-native-firebase/remote-config';
import {
  yourLifestyle as defaultLifestyle,
  dietaryPreferences as defaultDiet,
  yourStressLevel as defaultStress,
} from '../Constant/Constant';

type LocalizedList = Record<string, Array<{ key: string; title: string }>>;

const buildDefaultLocalized = (
  list: Array<{ key: string; title: string }>,
): LocalizedList => ({ en: list });

export const ensureRemoteDefaults = async () => {
  await remoteConfig().setDefaults({
    yourLifestyle: JSON.stringify(buildDefaultLocalized(defaultLifestyle)),
    dietaryPreferences: JSON.stringify(buildDefaultLocalized(defaultDiet)),
    yourStressLevel: JSON.stringify(buildDefaultLocalized(defaultStress)),
  });

  await remoteConfig().setConfigSettings({
    minimumFetchIntervalMillis: 60_000,
  });
};

export const fetchAndActivateConfig = async () => {
  await ensureRemoteDefaults();
  try {
    await remoteConfig().fetchAndActivate();
  } catch (_) {}
};

export const getLocalizedList = (
  key: 'yourLifestyle' | 'dietaryPreferences' | 'yourStressLevel',
  locale: string,
): Array<{ key: string; title: string }> => {
  try {
    const json = remoteConfig().getValue(key).asString();
    const parsed = JSON.parse(json) as LocalizedList;
    if (parsed[locale] && Array.isArray(parsed[locale])) return parsed[locale];
    if (parsed['en'] && Array.isArray(parsed['en'])) return parsed['en'];
  } catch (_) {}

  if (key === 'yourLifestyle') return defaultLifestyle;
  if (key === 'dietaryPreferences') return defaultDiet;
  return defaultStress;
};
