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

const isValidPassport = (passport) => {
  if (!includesRequiredFields(passport)) return false;
  const { byr, iyr, eyr, hgt, hcl, ecl, pid } = parsePassport(passport);
  return (
    byr >= 1920 &&
    byr <= 2002 &&
    iyr >= 2010 &&
    iyr <= 2020 &&
    eyr >= 2020 &&
    eyr <= 2030 &&
    ((hgt.units === 'cm' && hgt.value >= 150 && hgt.value <= 193) ||
      (hgt.units === 'in' && hgt.value >= 59 && hgt.value <= 76)) &&
    /^#[a-z0-9]{6}$/.test(hcl) &&
    ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl) &&
    !Number.isNaN(parseInt(pid)) &&
    pid.length === 9
  );
};

const answer4a = passports.filter(includesRequiredFields).length;
const answer4b = passports.filter(isValidPassport).length;
console.log({ answer4a, answer4b });
