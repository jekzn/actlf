let sleepData = [];

const sleepForm = document.getElementById("sleep-form");
const sleepList = document.querySelector(".sleep-list");
const totalSleepSpan = document.getElementById("total-sleep");
const commentsTextArea = document.getElementById("comments");

function logSleep(event) {
  event.preventDefault();

  const date = document.getElementById("date").value;
  const bedtime = document.getElementById("bedtime").value;
  const wakeup = document.getElementById("wakeup").value;

  const totalMinutes = calculateTotalMinutes(bedtime, wakeup);
  const evaluationMessage = getEvaluationMessage(totalMinutes);
  const newSleepEntry = {
    date,
    bedtime,
    wakeup,
    evaluation: evaluationMessage,
  };

  sleepData.push(newSleepEntry);

  updateSleepHistory();
  updateSleepStatistics();
  sleepForm.reset();
}
function calculateTotalMinutes(bedtime, wakeup) {
  const [bedHour, bedMin] = bedtime.split(":").map(Number);
  const [wakeHour, wakeMin] = wakeup.split(":").map(Number);
  return (wakeHour - bedHour) * 60 + (wakeMin - bedMin);
}
function getEvaluationMessage(totalMinutes) {
  if (totalMinutes < 360) {
    return "You didn't get enough sleep. Consider getting more rest.";
  } else if (totalMinutes > 480) {
    return "You got more than enough sleep.";
  } else {
    return "You slept well!";
  }
}

function updateSleepHistory() {
  let entriesHTML = "";
  sleepData.forEach((entry) => {
    entriesHTML += `<li>Date: ${entry.date}, Bedtime: ${entry.bedtime}, Wake up: ${entry.wakeup}</li>`;
  });
  sleepList.innerHTML = entriesHTML;
}
function updateSleepStatistics() {
  const totalMinutes = sleepData.reduce(
    (acc, entry) => acc + calculateTotalMinutes(entry.bedtime, entry.wakeup),
    0
  );
  const totalHours = Math.floor(totalMinutes / 60);
  const minutesRemainder = totalMinutes % 60;

  totalSleepSpan.textContent = `${totalHours} hours ${minutesRemainder} minutes`;
  let statsText = "";
  sleepData.forEach((entry) => {
    statsText += `Date: ${entry.date}, Evaluation: ${entry.evaluation}\n\n`;
  });
  commentsTextArea.value = statsText;
}

function clearSleepData() {
  sleepData = [];
  updateSleepHistory();
  updateSleepStatistics();
}

sleepForm.addEventListener("submit", logSleep);
