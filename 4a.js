const passportList = require("./4input");
const passports = passportList.split("\n\n");

const parsePassportFields = passport => {
  return passport.split('\n').map(line => line.split(' ')).flat().map(field => field.slice(0,3))
}

const isValidPassport = passport => {
  const passportFields = parsePassportFields(passport)
  console.log(passportFields)
  return passportFields.includes('byr') && passportFields.includes('iyr') && passportFields.includes('eyr') && passportFields.includes('hgt') && passportFields.includes('hcl') && passportFields.includes('ecl') && passportFields.includes('pid')
}

console.log(passports.reduce((sum, current) => {
  return isValidPassport(current) ? sum + 1 : sum
}, 0))