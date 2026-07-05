export const featureFlags = {
  darkMode: false,
  accessibility: false,
};

export function isFeatureEnabled(flagName: keyof typeof featureFlags): boolean {
  return featureFlags[flagName];
}
