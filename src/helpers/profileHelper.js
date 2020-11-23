export const locationToString = (locations) => {
  if (locations && locations.length > 0) {
    if (locations[0]?.country === null ) {
      return locations[0]?.cityName;
    }
    return `${locations[0]?.country?.name}, ${locations[0]?.city?.name}, ${locations[0]?.region?.name}`;
  }
  return "";
};

export const timeZoneToString = (timeZone) => {
  return timeZone
    ? `${timeZone?.code}-${timeZone?.name}, ${timeZone?.offset}`
    : "";
};

export const residencyToString = (residency) => {
  if (residency) {
    if (!residency?.city) {
      return residency.cityName;
    }
    return `${residency?.country?.name}, ${residency?.city?.name}, ${residency?.region?.name}`;
  } else return "";
};

export const getLocationFlag = (locations) => {
  if (locations && locations.length > 0) {
    if (!locations[0]?.country) return "";
    return locations[0]?.country?.isoCode
  } else return "";
};