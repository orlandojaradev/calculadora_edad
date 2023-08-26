const d = document,
  $enlace = d.querySelector(".arrow"),
  $day = d.getElementById("day"),
  $month = d.getElementById("month"),
  $year = d.getElementById("year"),
  $labelDay = d.querySelector(".label-day"),
  $labelMonth = d.querySelector(".label-month"),
  $labelYear = d.querySelector(".label-year"),
  $requiredDay = d.querySelector(".required-day"),
  $invalidDay = d.querySelector(".invalid-day"),
  $requiredMonth = d.querySelector(".required-month"),
  $invalidMonth = d.querySelector(".invalid-month"),
  $requiredYear = d.querySelector(".required-year"),
  $invalidYear = d.querySelector(".invalid-year"),
  $remainingYears = d.querySelector(".remaining-years"),
  $remainingMonths = d.querySelector(".remaining-months"),
  $remainingDays = d.querySelector(".remaining-days");

function fechaJuliana(d, m, y) {
  let actualYear;
  if (m <= 1) {
    actualYear = y - 1;
    m += 12;
  } else {
    actualYear = y;
  }
  let a = actualYear / 100,
    b = 2 - a + a / 4;
  let jd = 365.25 * (actualYear + 4716) + 30.6001 * (m + 1) + d + b - 1524.5;

  return jd;
}

function generarEdad(day, month, year) {
  const currentDay = new Date().getDate(),
    currentMonth = new Date().getMonth() + 1,
    currentYear = new Date().getFullYear(),
    dias =
      fechaJuliana(currentDay, currentMonth, currentYear) -
      fechaJuliana(day, month, year),
    years = dias / 365.25,
    months = (dias % 365.25) * 0.0329,
    days = (((dias % 365.25) * 0.0329) % 1) * 30.4167,
    remainingTime = [Math.trunc(days), Math.trunc(months), Math.trunc(years)];

  return remainingTime;
}

d.addEventListener("click", (e) => {
  if (e.target.matches(".arrow") || e.target.matches(".arrow *")) {
    if ($day.value === "") {
      $labelDay.classList.add("rojo");
      $day.classList.add("rojo");
      $requiredDay.classList.add("rojo");
      $requiredDay.style.setProperty("display", "block");
      $invalidDay.style.setProperty("display", "none");
    } else if (isNaN($day.value) || parseInt($day.value) > 31) {
      $labelDay.classList.add("rojo");
      $day.classList.add("rojo");
      $invalidDay.classList.add("rojo");
      $requiredDay.style.setProperty("display", "none");
      $invalidDay.style.setProperty("display", "block");
    } else if ($month.value === "") {
      $labelDay.classList.remove("rojo");
      $day.classList.remove("rojo");
      $requiredDay.style.setProperty("display", "none");
      $invalidDay.style.setProperty("display", "none");
      $labelMonth.classList.add("rojo");
      $month.classList.add("rojo");
      $requiredMonth.classList.add("rojo");
      $requiredMonth.style.setProperty("display", "block");
      $invalidMonth.style.setProperty("display", "none");
    } else if (isNaN($month.value) || parseInt($month.value) > 12) {
      $labelMonth.classList.add("rojo");
      $month.classList.add("rojo");
      $invalidMonth.classList.add("rojo");
      $requiredMonth.style.setProperty("display", "none");
      $invalidMonth.style.setProperty("display", "block");
    } else if ($year.value === "") {
      $labelMonth.classList.remove("rojo");
      $month.classList.remove("rojo");
      $requiredMonth.style.setProperty("display", "none");
      $invalidMonth.style.setProperty("display", "none");
      $labelYear.classList.add("rojo");
      $year.classList.add("rojo");
      $requiredYear.classList.add("rojo");
      $requiredYear.style.setProperty("display", "block");
      $invalidYear.style.setProperty("display", "none");
    } else if (
      isNaN($year.value) ||
      parseInt($year.value) > new Date().getFullYear()
    ) {
      $labelYear.classList.add("rojo");
      $year.classList.add("rojo");
      $invalidYear.classList.add("rojo");
      $requiredYear.style.setProperty("display", "none");
      $invalidYear.style.setProperty("display", "block");
    } else {
      $labelDay.classList.remove("rojo");
      $day.classList.remove("rojo");
      $requiredDay.style.setProperty("display", "none");
      $invalidDay.style.setProperty("display", "none");
      $labelMonth.classList.remove("rojo");
      $month.classList.remove("rojo");
      $requiredMonth.style.setProperty("display", "none");
      $invalidMonth.style.setProperty("display", "none");
      $labelYear.classList.remove("rojo");
      $year.classList.remove("rojo");
      $requiredYear.style.setProperty("display", "none");
      $invalidYear.style.setProperty("display", "none");

      //Despues de validar los datos, podemos trabajar con ellos.

      $remainingYears.textContent = generarEdad(
        parseInt($day.value),
        parseInt($month.value),
        parseInt($year.value)
      )[2];
      $remainingMonths.textContent = generarEdad(
        parseInt($day.value),
        parseInt($month.value),
        parseInt($year.value)
      )[1];
      $remainingDays.textContent = generarEdad(
        parseInt($day.value),
        parseInt($month.value),
        parseInt($year.value)
      )[0];
    }
  }
});
