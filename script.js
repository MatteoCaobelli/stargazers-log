const list = document.querySelector("#starred");
const status = document.querySelector("#status");

function setStatus(message, type = "") {
  status.textContent = message;
  status.dataset.type = type;
}

function isValidName(name) {
  return (
    typeof name === "string" &&
    /^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\/[A-Za-z0-9._-]+$/.test(
      name
    )
  );
}

function isValidDate(date) {
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return false;
  }

  const parsed = new Date(`${date}T00:00:00Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === date;
}

async function loadEvents() {
  if (!list || !status) {
    return;
  }

  try {
    const response = await fetch("events.json", { cache: "no-cache" });

    if (!response.ok) {
      throw new Error(`Could not load starred repositories (HTTP ${response.status}).`);
    }

    const events = await response.json();

    if (!Array.isArray(events)) {
      throw new Error("The repository data has an unexpected format.");
    }

    const validEvents = events.filter(
      (event) =>
        event &&
        isValidName(event.name) &&
        isValidDate(event.starred)
    );

    validEvents.sort((a, b) => b.starred.localeCompare(a.starred));
    list.replaceChildren();

    if (validEvents.length === 0) {
      setStatus("No starred repositories are available.", "empty");
      return;
    }

    validEvents.forEach((event) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      

      link.href = `https://github.com/${event.name}`;
      link.textContent = event.name;

      

      item.append(link);
      list.appendChild(item);
    });

    setStatus(
      `${validEvents.length} starred ${
        validEvents.length === 1 ? "repository" : "repositories"
      }.`,
      "success"
    );
  } catch (error) {
    console.error(error);
    setStatus(
      "Sorry, the starred repositories could not be loaded. Please try again later.",
      "error"
    );
  }
}

loadEvents();
