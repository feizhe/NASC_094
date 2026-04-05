(function () {
  const decks = {
    week1: { label: "Week 1", file: "Week1.md" },
    week2: { label: "Week 2", file: "Week2.md" }
  };

  const heading = document.getElementById("deck-heading");
  const summary = document.getElementById("deck-summary");
  const content = document.getElementById("notes-content");
  const tabs = Array.from(document.querySelectorAll(".note-tab"));

  function escapeHtml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderInline(text) {
    let html = escapeHtml(text);
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    return html;
  }

  function parseBlocks(lines) {
    const blocks = [];
    let index = 0;

    while (index < lines.length) {
      const rawLine = lines[index];
      const trimmed = rawLine.trim();

      if (!trimmed) {
        index += 1;
        continue;
      }

      if (/^\* /.test(trimmed)) {
        const items = [];
        while (index < lines.length && /^\* /.test(lines[index].trim())) {
          items.push(lines[index].trim().replace(/^\* /, ""));
          index += 1;
        }
        blocks.push({ type: "ul", items });
        continue;
      }

      if (/^\d+\.\s/.test(trimmed)) {
        const items = [];
        while (index < lines.length && /^\d+\.\s/.test(lines[index].trim())) {
          items.push(lines[index].trim().replace(/^\d+\.\s/, ""));
          index += 1;
        }
        blocks.push({ type: "ol", items });
        continue;
      }

      const paragraph = [];
      while (
        index < lines.length &&
        lines[index].trim() &&
        !/^\* /.test(lines[index].trim()) &&
        !/^\d+\.\s/.test(lines[index].trim())
      ) {
        paragraph.push(lines[index].trimRight());
        index += 1;
      }
      blocks.push({ type: "p", lines: paragraph });
    }

    return blocks;
  }

  function parseDeck(markdown) {
    const sections = markdown
      .split(/\n---+\n/g)
      .map((section) => section.trim())
      .filter(Boolean);

    const titleLines = sections.shift().split("\n").map((line) => line.trim()).filter(Boolean);
    const title = titleLines.find((line) => line.startsWith("# ")) || "# Lecture Notes";
    const subtitle = titleLines.filter((line) => !line.startsWith("# "));

    const slides = sections.map((section) => {
      const lines = section.split("\n");
      let slideTitle = "";

      if (lines[0] && lines[0].startsWith("## ")) {
        slideTitle = lines.shift().slice(3).trim();
      }

      return {
        title: slideTitle,
        blocks: parseBlocks(lines)
      };
    });

    return {
      title: title.slice(2).trim(),
      subtitle,
      slides
    };
  }

  function renderBlock(block) {
    if (block.type === "ul") {
      return `<ul class="feature-list">${block.items.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ul>`;
    }

    if (block.type === "ol") {
      return `<ol class="notes-ordered-list">${block.items.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ol>`;
    }

    const html = block.lines.map((line) => renderInline(line)).join("<br>");
    return `<p>${html}</p>`;
  }

  function renderDeck(deckKey, deck) {
    heading.textContent = decks[deckKey].label;
    summary.innerHTML = `${renderInline(deck.title)}<br><span class="muted notes-subtitle">${deck.subtitle.map((line) => renderInline(line)).join(" • ")}</span>`;

    content.innerHTML = deck.slides.map((slide) => {
      const title = slide.title ? `<h2>${escapeHtml(slide.title)}</h2>` : "";
      const blocks = slide.blocks.map((block) => renderBlock(block)).join("");
      return `<section class="content-panel note-slide">${title}${blocks}</section>`;
    }).join("");

    tabs.forEach((tab) => {
      const isActive = tab.dataset.week === deckKey;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-current", isActive ? "page" : "false");
    });
  }

  async function loadDeck(deckKey) {
    const selectedDeck = decks[deckKey] || decks.week1;
    content.innerHTML = `
      <section class="content-panel note-slide">
        <p class="muted">Loading ${selectedDeck.label}...</p>
      </section>
    `;

    try {
      const response = await fetch(selectedDeck.file);
      if (!response.ok) {
        throw new Error(`Unable to load ${selectedDeck.file}`);
      }

      const markdown = await response.text();
      renderDeck(deckKey, parseDeck(markdown));
    } catch (error) {
      heading.textContent = selectedDeck.label;
      summary.textContent = "The markdown file could not be loaded.";
      content.innerHTML = `
        <section class="content-panel note-slide">
          <h2>Unable to load notes</h2>
          <p>Please confirm that <code>${selectedDeck.file}</code> exists in the <code>lecture_notes/</code> folder.</p>
        </section>
      `;
    }
  }

  function currentDeckKey() {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    return decks[hash] ? hash : "week1";
  }

  window.addEventListener("hashchange", () => {
    loadDeck(currentDeckKey());
  });

  loadDeck(currentDeckKey());
}());
