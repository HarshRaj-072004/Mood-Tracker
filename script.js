let selectedEmoji = "";
const emojiButtons = document.querySelectorAll(".emoji");
const saveBtn = document.getElementById("save");
const noteInput = document.getElementById("note");
const calendar = document.getElementById("calendar");
const themeBtn = document.getElementById("toggle-theme");

// Load dark mode
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// Toggle dark/light theme
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// Select emoji
emojiButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedEmoji = btn.textContent;
    emojiButtons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});

// Save mood to localStorage
saveBtn.addEventListener("click", () => {
  if (!selectedEmoji) return alert("Please select your mood.");
  const today = new Date().toISOString().slice(0, 10);
  const note = noteInput.value.trim();

  const data = JSON.parse(localStorage.getItem("mood-data") || "{}");
  data[today] = { emoji: selectedEmoji, note };
  localStorage.setItem("mood-data", JSON.stringify(data));

  noteInput.value = "";
  selectedEmoji = "";
  emojiButtons.forEach(b => b.classList.remove("selected"));
  loadCalendar();
  alert("Mood saved!");
});

// Load calendar
function loadCalendar() {
  calendar.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("mood-data") || "{}");

  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = date.toISOString().slice(0, 10);
    const day = document.createElement("div");
    day.classList.add("day");

    if (data[key]) {
      day.textContent = data[key].emoji;
      if (data[key].note) {
        day.setAttribute("data-note", data[key].note);
      }
    } else {
      day.textContent = "⬜";
      day.setAttribute("data-note", "No entry");
    }

    calendar.appendChild(day);
  }
}

loadCalendar();
