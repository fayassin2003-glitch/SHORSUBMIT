export function showMessage(element, text, type = 'success') {
  element.className = `message ${type === 'error' ? 'error' : ''}`;
  element.textContent = text;
}

export function emptyState(text) {
  return `<p>${text}</p>`;
}
