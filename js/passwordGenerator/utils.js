applyFill = function (slider) {
  const percentage =
    (100 * (slider.value - slider.min)) / (slider.max - slider.min);
  const bg = `linear-gradient(90deg, ${sliderProps.fill} ${percentage}%, ${
    sliderProps.background
  } ${percentage + 0.1}%)`;
  slider.style.background = bg;
  sliderValue.setAttribute("data-length", slider.value);
};

function disableOnlyCheckbox() {
  let totalChecked = [uppercaseEl, lowercaseEl, numberEl, symbolEl].filter(
    (el) => el.checked
  );
  totalChecked.forEach((el) => {
    if (totalChecked.length == 1) {
      el.disabled = true;
    } else {
      el.disabled = false;
    }
  });
}

function saveCheckboxStateToCookie(checkbox) {
  setCookie(`${checkbox.id}CheckboxState`, checkbox.checked, 365);
}

function loadValuesFromCookies() {
  const savedSliderValue = getCookie("sliderValue");
  if (savedSliderValue) {
    slider.querySelector("input").value = savedSliderValue;
    sliderValue.setAttribute("data-length", savedSliderValue);
  }
  applyFill(slider.querySelector("input"));
  lowercaseEl.checked = getCookie("lowercaseCheckboxState") !== "false";
  uppercaseEl.checked = getCookie("uppercaseCheckboxState") !== "false";
  numberEl.checked = getCookie("numberCheckboxState") !== "false";
  symbolEl.checked = getCookie("symbolCheckboxState") !== "false";
}
