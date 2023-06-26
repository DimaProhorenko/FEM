const form = document.querySelector(".ac__form");
const dayInput = form.querySelector("#day");
const monthInput = form.querySelector("#month");
const yearInput = form.querySelector("#year");
const yearInfo = document.querySelector("#year-info");
const monthInfo = document.querySelector("#month-info");
const dayInfo = document.querySelector("#day-info");

// const validateDay = (day) => {
//     if (day < 0) {
//         return {false}
//     }

// }

const validateDate = (day, month, year) => {
    const date = new Date(year, month - 1, day);
    console.log(date);

    return date.getFullYear() == year 
        && date.getMonth() == month - 1 
        && date.getDate() == day
        && year < new Date().getFullYear();
}

const showError = () => {
    if (form.classList.contains("form--error")) {
        return;
    }
    form.classList.add("form--error");
    const errorNode = document.createElement("span");
    errorNode.textContent = "Must be a valid date";
    errorNode.classList.add("form__error-block");
    form.insertBefore(errorNode, form.querySelector(".form__submit"));
}

const hideError = () => {
    if (form.classList.contains("form--error")) {
        form.classList.remove("form--error");
        form.removeChild(document.querySelector(".form__error-block"));
    }
}

const calcAge = (dateOfBirth) => {
    const now = new Date();
    console.log(new Date(now - dateOfBirth));
    const data = new Date(now.getTime() - dateOfBirth.getTime());
    return {
        years: now.getFullYear() - dateOfBirth.getFullYear(),
        months: (now.getMonth() - dateOfBirth.getMonth()) + 1,
        days: now.getDate() - dateOfBirth.getDate()
    }
}

const showResult = (result) => {
    yearInfo.textContent = result.years;
    monthInfo.textContent = result.months;
    dayInfo.textContent = result.days;
}


const formSubmitHandler = (e) => {
    e.preventDefault();
    const selectedDay = dayInput.value;
    const selectedMonth = monthInput.value;
    const selectedYear = yearInput.value;
    if (validateDate(selectedDay, selectedMonth, selectedYear)) {
        hideError();
        const dateOfBirth = new Date(selectedYear, selectedMonth - 1, selectedDay);
        const result = calcAge(dateOfBirth);
        showResult(result);
    } else {
        showError();
    }
}

form.addEventListener("submit", formSubmitHandler);