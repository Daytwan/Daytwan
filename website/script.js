const poster = document.querySelector("[data-poster]");
const modeButtons = [...document.querySelectorAll("[data-mode-button]")];
const modePanels = [...document.querySelectorAll("[data-mode-panel]")];
const modeOrder = ["about", "proof", "practice", "contact"];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let activeMode;

const modeFromHash = () => {
  const mode = window.location.hash.slice(1).toLowerCase();
  return modeOrder.includes(mode) ? mode : null;
};

const updateHash = (mode, method) => {
  const nextHash = `#${mode}`;
  if (window.location.hash === nextHash) return;
  window.history[method]({ mode }, "", nextHash);
};

const prepareAnimation = (panel) => {
  modePanels.forEach((item) => item.classList.remove("is-entering"));

  if (reducedMotion.matches) return;

  void panel.offsetWidth;
  panel.classList.add("is-entering");
};

const switchMode = (
  nextMode,
  { moveFocus = false, historyMethod = "pushState" } = {},
) => {
  const normalizedMode = modeOrder.includes(nextMode) ? nextMode : "about";
  const selectedButton = modeButtons.find(
    (button) => button.dataset.modeButton === normalizedMode,
  );
  if (normalizedMode === activeMode) {
    if (moveFocus) selectedButton?.focus();
    if (historyMethod) updateHash(normalizedMode, historyMethod);
    return;
  }

  activeMode = normalizedMode;
  poster?.setAttribute("data-active-mode", normalizedMode);

  const selectedPanel = modePanels.find(
    (panel) => panel.dataset.modePanel === normalizedMode,
  );
  prepareAnimation(selectedPanel);

  modeButtons.forEach((button) => {
    const isActive = button === selectedButton;
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });

  modePanels.forEach((panel) => {
    const isActive = panel.dataset.modePanel === normalizedMode;
    panel.hidden = !isActive;
    panel.classList.toggle("is-active", isActive);
  });

  if (moveFocus) selectedButton?.focus();
  if (historyMethod) updateHash(normalizedMode, historyMethod);
};

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switchMode(button.dataset.modeButton);
  });

  button.addEventListener("keydown", (event) => {
    const currentIndex = modeButtons.indexOf(button);
    const targetIndexes = {
      ArrowLeft: (currentIndex - 1 + modeButtons.length) % modeButtons.length,
      ArrowRight: (currentIndex + 1) % modeButtons.length,
      Home: 0,
      End: modeButtons.length - 1,
    };
    const targetIndex = targetIndexes[event.key];

    if (targetIndex === undefined) return;

    event.preventDefault();
    switchMode(modeOrder[targetIndex], { moveFocus: true });
  });
});

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) return;

  const mode = modeOrder[Number(event.key) - 1];
  if (!mode) return;

  event.preventDefault();
  switchMode(mode, { moveFocus: true });
});

const syncModeFromHistory = () => {
  const mode = modeFromHash();
  if (mode) switchMode(mode, { historyMethod: null });
};

window.addEventListener("popstate", syncModeFromHistory);
window.addEventListener("hashchange", syncModeFromHistory);

const initialHashMode = modeFromHash();
const initialMode = initialHashMode ?? "about";
switchMode(initialMode, {
  historyMethod:
    !window.location.hash && !initialHashMode ? "replaceState" : null,
});

modeButtons.forEach((button) => {
  button.disabled = false;
});

poster?.classList.add("is-ready");
if (!reducedMotion.matches) {
  poster?.classList.add("is-intro");
}
