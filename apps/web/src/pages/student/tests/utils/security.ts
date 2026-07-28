// ======================================================
// Fullscreen
// ======================================================

export async function enterFullscreen() {
  if (!document.fullscreenElement) {
    try {
      await document.documentElement.requestFullscreen();
    } catch (err) {
      console.error("Failed to enter fullscreen", err);
    }
  }
}

export async function exitFullscreen() {
  if (document.fullscreenElement) {
    try {
      await document.exitFullscreen();
    } catch (err) {
      console.error("Failed to exit fullscreen", err);
    }
  }
}

// ======================================================
// Context Menu
// ======================================================

const contextMenuHandler = (e: MouseEvent) => {
  e.preventDefault();
};

export function disableContextMenu() {
  document.addEventListener(
    "contextmenu",
    contextMenuHandler
  );
}

export function enableContextMenu() {
  document.removeEventListener(
    "contextmenu",
    contextMenuHandler
  );
}

// ======================================================
// Copy / Paste / Cut
// ======================================================

const clipboardHandler = (e: ClipboardEvent) => {
  e.preventDefault();
};

export function disableClipboard() {
  document.addEventListener("copy", clipboardHandler);
  document.addEventListener("paste", clipboardHandler);
  document.addEventListener("cut", clipboardHandler);
}

export function enableClipboard() {
  document.removeEventListener("copy", clipboardHandler);
  document.removeEventListener("paste", clipboardHandler);
  document.removeEventListener("cut", clipboardHandler);
}

// ======================================================
// Drag
// ======================================================

const dragHandler = (e: DragEvent) => {
  e.preventDefault();
};

export function disableDrag() {
  document.addEventListener("dragstart", dragHandler);
}

export function enableDrag() {
  document.removeEventListener("dragstart", dragHandler);
}

// ======================================================
// Keyboard
// ======================================================

const keyHandler = (e: KeyboardEvent) => {
  const key = e.key.toLowerCase();

  // F12
  if (e.key === "F12") {
    e.preventDefault();
    return;
  }

  // Ctrl + Shift + I
  if (e.ctrlKey && e.shiftKey && key === "i") {
    e.preventDefault();
    return;
  }

  // Ctrl + Shift + C
  if (e.ctrlKey && e.shiftKey && key === "c") {
    e.preventDefault();
    return;
  }

  // Ctrl + Shift + J
  if (e.ctrlKey && e.shiftKey && key === "j") {
    e.preventDefault();
    return;
  }

  // Ctrl + U
  if (e.ctrlKey && key === "u") {
    e.preventDefault();
    return;
  }

  // Ctrl + C
  if (e.ctrlKey && key === "c") {
    e.preventDefault();
    return;
  }

  // Ctrl + V
  if (e.ctrlKey && key === "v") {
    e.preventDefault();
    return;
  }

  // Ctrl + X
  if (e.ctrlKey && key === "x") {
    e.preventDefault();
    return;
  }

  // Ctrl + A
  if (e.ctrlKey && key === "a") {
    e.preventDefault();
    return;
  }

  // Ctrl + S
  if (e.ctrlKey && key === "s") {
    e.preventDefault();
    return;
  }

  // Ctrl + P
  if (e.ctrlKey && key === "p") {
    e.preventDefault();
    return;
  }
};

export function disableKeyboardShortcuts() {
  document.addEventListener("keydown", keyHandler);
}

export function enableKeyboardShortcuts() {
  document.removeEventListener("keydown", keyHandler);
}

// ======================================================
// Text Selection
// ======================================================

export function disableSelection() {
  document.body.style.userSelect = "none";
}

export function enableSelection() {
  document.body.style.userSelect = "";
}

// ======================================================
// Before unload
// ======================================================

const unloadHandler = (e: BeforeUnloadEvent) => {
  e.preventDefault();
  e.returnValue = "";
};

export function enableRefreshWarning() {
  window.addEventListener(
    "beforeunload",
    unloadHandler
  );
}

export function disableRefreshWarning() {
  window.removeEventListener(
    "beforeunload",
    unloadHandler
  );
}

// ======================================================
// Enable all exam protections
// ======================================================

export function enableExamSecurity() {
  disableContextMenu();
  disableClipboard();
  disableDrag();
  disableKeyboardShortcuts();
  disableSelection();
  enableRefreshWarning();
}

// ======================================================
// Disable all exam protections
// ======================================================

export function disableExamSecurity() {
  enableContextMenu();
  enableClipboard();
  enableDrag();
  enableKeyboardShortcuts();
  enableSelection();
  disableRefreshWarning();
}