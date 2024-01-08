// generator.js

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

function secureMathRandom() {
  return (
    window.crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1)
  );
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(secureMathRandom() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*()_+-={}[];<>:";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword(length, lower, upper, number, symbol) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  if (typesCount === 0) {
    return "";
  }
  for (let i = 0; i < length; i++) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }
  return generatedPassword
    .slice(0, length)
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}
