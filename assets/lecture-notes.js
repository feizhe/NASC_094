(function () {
  const decks = {
    week1: { label: "Week 1", file: "Week1.md", layout: "stack" },
    week2: { label: "Week 2", file: "Week2.md", layout: "stack" },
    week3: {
      label: "Week 3",
      file: "Week3.md",
      layout: "split",
      paper: {
        url: "../papers/nature21056.pdf#view=FitH",
        title: "Dermatologist-level classification of skin cancer with deep neural networks",
        citation: "Esteva et al. • Nature • 2017"
      }
    }
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

  function renderSlides(slides) {
    return slides.map((slide) => {
      const title = slide.title ? `<h2>${escapeHtml(slide.title)}</h2>` : "";
      const blocks = slide.blocks.map((block) => renderBlock(block)).join("");
      return `<section class="content-panel note-slide">${title}${blocks}</section>`;
    }).join("");
  }

  function renderSplitDeck(deck, deckConfig) {
    const paper = deckConfig.paper;

    return `
      <div class="notes-split-layout">
        <section class="split-pane split-pane-notes" aria-label="${escapeHtml(deckConfig.label)} notes">
          <div class="split-pane-stack">
            ${renderSlides(deck.slides)}
          </div>
        </section>

        <section class="split-pane split-pane-paper" aria-label="Research paper PDF viewer">
          <div class="paper-pane-body">
            <p class="paper-loading muted">Loading the PDF in this pane...</p>
            <iframe class="paper-embed" src="${paper.url}" title="${escapeHtml(paper.title)}" loading="lazy"></iframe>
            <div class="paper-fallback" hidden></div>
          </div>
        </section>
      </div>
    `;
  }

  function setupPaperPane(deckConfig) {
    if (!deckConfig.paper) {
      return;
    }

    const pane = content.querySelector(".split-pane-paper");
    if (!pane) {
      return;
    }

    const frame = pane.querySelector(".paper-embed");
    const fallback = pane.querySelector(".paper-fallback");
    const loading = pane.querySelector(".paper-loading");
    const fallbackTimer = window.setTimeout(showFallback, 4500);

    function showLoaded() {
      if (!pane.isConnected) {
        return;
      }

      window.clearTimeout(fallbackTimer);
      pane.classList.remove("is-fallback");
      pane.classList.add("is-loaded");
      fallback.hidden = true;
      loading.hidden = true;
    }

    function showFallback() {
      if (!pane.isConnected) {
        return;
      }

      pane.classList.remove("is-loaded");
      pane.classList.add("is-fallback");
      fallback.hidden = false;
      loading.hidden = true;
    }

    frame.addEventListener("load", showLoaded, { once: true });
    frame.addEventListener("error", showFallback, { once: true });
  }

  function renderDeck(deckKey, deck) {
    const deckConfig = decks[deckKey];

    heading.textContent = deckConfig.label;
    summary.innerHTML = `${renderInline(deck.title)}<br><span class="muted notes-subtitle">${deck.subtitle.map((line) => renderInline(line)).join(" • ")}</span>`;

    if (deckConfig.layout === "split") {
      content.innerHTML = renderSplitDeck(deck, deckConfig);
      setupPaperPane(deckConfig);
    } else {
      content.innerHTML = renderSlides(deck.slides);
    }

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
