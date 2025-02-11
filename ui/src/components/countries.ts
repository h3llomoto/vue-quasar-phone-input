import { Country } from './types';
import { countryInformation } from './data';

const all = countryInformation.map((item) => {
  const clonedItem:Country = { ...item };

  if (item.languages) {
    clonedItem.languages = [...item.languages];
  }

  clonedItem.iso2LC = item.iso2.toLowerCase();
  clonedItem.nameLC = item.name.toLowerCase();

  return clonedItem;
}).sort((a, b) => {
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
});

export default all;

export const getDefault = (country = 'us') => all.find((a) => a.iso2 === country.trim().toUpperCase());

export const getCountryCodeFromPhoneNumber = (number: string, countryList: Country[]) => {
  let num = number.trim();
  if (num.indexOf('+') === 0) {
    num = num.slice(1);
  }
  return countryList.find((f) => num.indexOf(f.dialCode) === 0);
};

export const getCountryByDialCode = (val = '') => all.find((f) => f.dialCode && val.indexOf(`+${f.dialCode}`) !== -1);

export const filterCountries = (search: string, countryList: Country[]): Country[] => {
  const term = search.includes('+') ? search.replace('+', '') : search;
  return countryList.filter((f) => {
    if (
      f.dialCode.indexOf(term) !== -1
      || (term.length > 2 && f.iso2LC!.indexOf(term) !== -1)
      || f.nameLC!.indexOf(term) !== -1
    ) {
      return true;
    }
    return false;
  });
};
