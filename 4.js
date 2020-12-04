const passportList = require('./4input');

const passports = passportList.split('\n\n');

const parsePassport = (passport) =>
  passport
    .split('\n')
    .map((line) => line.split(' '))
    .flat()
    .reduce((fields, field) => {
      const [name, value] = field.split(':');
      switch (name) {
        case 'byr':
        case 'iyr':
        case 'eyr':
          return { ...fields, [name]: parseInt(value) };
        case 'hgt':
          return {
            ...fields,
            hgt: {
              units: value.slice(-2),
              value: parseInt(value.slice(0, -2)),
            },
          };
        default:
          return { ...fields, [name]: value };
      }
    }, {});

const includesRequiredFields = (passport) => {
  const fields = Object.keys(parsePassport(passport));
  return ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every((field) =>
    fields.includes(field)
  );
};

const isValidBirthYear = (year) => year >= 1920 && year <= 2002;
const isValidIssueYear = (year) => year >= 2010 && year <= 2020;
const isValidExpirationYear = (year) => year >= 2020 && year <= 2030;
const isValidHeight = ({ units, value }) =>
  (units === 'cm' && value >= 150 && value <= 193) ||
  (units === 'in' && value >= 59 && value <= 76);
const isValidHairColor = (color) => /^#[a-z0-9]{6}$/.test(color);
const isValidEyeColor = (color) =>
  ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(color);
const isValidPassportID = (id) =>
  !Number.isNaN(parseInt(id)) && id.length === 9;

const isValidPassport = (passport) => {
  if (!includesRequiredFields(passport)) return false;
  const { byr, iyr, eyr, hgt, hcl, ecl, pid } = parsePassport(passport);
  return (
    isValidBirthYear(byr) &&
    isValidIssueYear(iyr) &&
    isValidExpirationYear(eyr) &&
    isValidHeight(hgt) &&
    isValidHairColor(hcl) &&
    isValidEyeColor(ecl) &&
    isValidPassportID(pid)
  );
};

const answer4a = passports.filter(includesRequiredFields).length;
const answer4b = passports.filter(isValidPassport).length;
console.log({ answer4a, answer4b });
