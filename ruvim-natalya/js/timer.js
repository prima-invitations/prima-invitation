function startCountdown(targetDate) {

  const numbers = document.querySelectorAll(".timer__number");

  function updateNumber(container, value) {

    const current = container.querySelector(".current");
    const next = container.querySelector(".next");

    if (current.textContent === value) return;

    next.textContent = value;

    container.classList.add("animate");

    const onEnd = () => {

      current.textContent = value;

      container.classList.remove("animate");

      current.classList.remove("current");
      current.classList.add("next");

      next.classList.remove("next");
      next.classList.add("current");

      container.removeEventListener("transitionend", onEnd);
    };

    container.addEventListener("transitionend", onEnd, { once: true });

  }

  function updateTimer() {

    const diff = targetDate - Date.now();

    if (diff <= 0) {

      numbers.forEach(el => {
        el.querySelector(".current").textContent = "00";
        el.querySelector(".next").textContent = "00";
      });

      clearInterval(interval);
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff % 86400000 / 3600000);
    const minutes = Math.floor(diff % 3600000 / 60000);
    const seconds = Math.floor(diff % 60000 / 1000);

    updateNumber(numbers[0], String(days).padStart(2, "0"));
    updateNumber(numbers[1], String(hours).padStart(2, "0"));
    updateNumber(numbers[2], String(minutes).padStart(2, "0"));
    updateNumber(numbers[3], String(seconds).padStart(2, "0"));

  }

  updateTimer();

  const interval = setInterval(updateTimer, 1000);

}

const targetDate = new Date('2026-11-15T10:00:00+03:00').getTime();

startCountdown(targetDate);