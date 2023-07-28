const apiUrl = "http://localhost:3000/api";

const sleepData = [];

const sleepForm = document.getElementById("sleep-form");
const sleepList = document.querySelector(".sleep-list");
const totalSleepSpan = document.getElementById("total-sleep");
const commentsTextArea = document.getElementById("comments");

function fetchSleepData() {
  fetch(`${apiUrl}/sleep`)
    .then((response) => response.json())
    .then((data) => {
      sleepData.length = 0;
      sleepData.push(...data);
      updateSleepHistory();
      updateSleepStatistics();
    })
    .catch((error) => {
      console.error("Error fetching sleep data:", error);
    });
}

function addSleepData(event) {
  event.preventDefault();

  const date = document.getElementById("date").value;
  const bedtime = document.getElementById("bedtime").value;
  const wakeup = document.getElementById("wakeup").value;

  const sleepEntry = {
    date,
    bedtime,
    wakeup,
  };

  fetch(`${apiUrl}/sleep`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sleepEntry),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Sleep data added:", data);

      sleepData.push(data);

      updateSleepHistory();
      updateSleepStatistics();

      sleepForm.reset();

      fetchSleepData();
    })
    .catch((error) => {
      console.error("Error adding sleep data:", error);
    });

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
    return "You slept too much.";
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
  sleepData.length = 0;
  updateSleepHistory();
  updateSleepStatistics();

  fetch(`${apiUrl}/sleep`, {
    method: "DELETE",
  })
    .then(() => {
      console.log("Sleep data cleared.");
    })
    .catch((error) => {
      console.error("Error clearing sleep data:", error);
    });
}

sleepForm.addEventListener("submit", addSleepData);

fetchSleepData();
