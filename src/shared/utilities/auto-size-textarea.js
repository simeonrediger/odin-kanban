import '../styles/auto-size-textarea.css';

const autoSizeTextareas = document.querySelectorAll('textarea.auto-size');

for (const textarea of autoSizeTextareas) {

    textarea.addEventListener('input', () => {
        autoSizeTextarea(textarea)
    });
}

export default function autoSizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}
