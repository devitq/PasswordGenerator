const sliderProps = {
  fill: "#0B1EDF",
  background: "rgba(255, 255, 255, 0.214)",
};
const slider = document.querySelector(".range__slider");
const sliderValue = document.querySelector(".length__title");
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("slider");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy-btn");
const resultContainer = document.querySelector(".result");
const copyInfo = document.querySelector(".result__info.right");
const copiedInfo = document.querySelector(".result__info.left");

let generatedPassword = false;
let resultContainerBound = {
  left: resultContainer.getBoundingClientRect().left,
  top: resultContainer.getBoundingClientRect().top,
};

loadValuesFromCookies();

slider.querySelector("input").addEventListener("input", (event) => {
  sliderValue.setAttribute("data-length", event.target.value);
  applyFill(event.target);
  setCookie("sliderValue", event.target.value, 365);
  generatedPassword = true;
  resultEl.innerText = generatePassword(
    +lengthEl.value,
    lowercaseEl.checked,
    uppercaseEl.checked,
    numberEl.checked,
    symbolEl.checked
  );
  copyInfo.style.transform = "translateY(0%)";
  copyInfo.style.opacity = "0.75";
  copiedInfo.style.transform = "translateY(200%)";
  copiedInfo.style.opacity = "0";
});

resultContainer.addEventListener("mousemove", (e) => {
  resultContainerBound = {
    left: resultContainer.getBoundingClientRect().left,
    top: resultContainer.getBoundingClientRect().top,
  };

  if (generatedPassword) {
    copyBtn.style.opacity = "1";
    copyBtn.style.pointerEvents = "all";
    copyBtn.style.setProperty("--x", `${e.x - resultContainerBound.left}px`);
    copyBtn.style.setProperty("--y", `${e.y - resultContainerBound.top}px`);
  } else {
    copyBtn.style.opacity = "0";
    copyBtn.style.pointerEvents = "none";
  }
});

window.addEventListener("resize", (e) => {
  resultContainerBound = {
    left: resultContainer.getBoundingClientRect().left,
    top: resultContainer.getBoundingClientRect().top,
  };
});

copyBtn.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;
  if (!password || password == "CLICK GENERATE") {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();

  copyInfo.style.transform = "translateY(200%)";
  copyInfo.style.opacity = "0";
  copiedInfo.style.transform = "translateY(0%)";
  copiedInfo.style.opacity = "0.75";
});

generateBtn.addEventListener("click", () => {
  generatedPassword = true;
  resultEl.innerText = generatePassword(
    +lengthEl.value,
    lowercaseEl.checked,
    uppercaseEl.checked,
    numberEl.checked,
    symbolEl.checked
  );
  copyInfo.style.transform = "translateY(0%)";
  copyInfo.style.opacity = "0.75";
  copiedInfo.style.transform = "translateY(200%)";
  copiedInfo.style.opacity = "0";
});

[uppercaseEl, lowercaseEl, numberEl, symbolEl].forEach((el) => {
  el.addEventListener("change", () => {
    disableOnlyCheckbox();
    saveCheckboxStateToCookie(el);
    generatedPassword = true;
    resultEl.innerText = generatePassword(
      +lengthEl.value,
      lowercaseEl.checked,
      uppercaseEl.checked,
      numberEl.checked,
      symbolEl.checked
    );
    copyInfo.style.transform = "translateY(0%)";
    copyInfo.style.opacity = "0.75";
    copiedInfo.style.transform = "translateY(200%)";
    copiedInfo.style.opacity = "0";
  });
});
