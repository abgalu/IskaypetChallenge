export const getMapConfig = (label, { lat, lng }) => (
  {
    android: `geo:0,0?q=${lat},${lng}(${label})`,
    ios: `maps:0,0?q=${label}@${lat},${lng}`,
  }
);

export const getPrincipalName = (name) => name.split(' ')[0];
