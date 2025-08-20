<script setup>
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';

defineProps({
    message: Object,
    sessionId: String,
    showSessionId: Boolean
})

function formatTimestamp(timestamp) {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function splitMessage(content) {
    const parts = [];
    const regex = /```([a-z]*)\s*\n?([\s\S]*?)```/gi;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
        if (match.index > lastIndex) {
            parts.push({ type: 'text', content: content.slice(lastIndex, match.index).trim() });
        }
        parts.push({
            type: 'code',
            lang: match[1] || '',
            content: normalizeIndent(match[2])
        });
        lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) {
        parts.push({ type: 'text', content: content.slice(lastIndex).trim() });
    }

    return parts;
}

function normalizeIndent(code) {
    const lines = code.split('\n');
    const minIndent = Math.min(
        ...lines.filter(l => l.trim()).map(l => l.match(/^(\s*)/)[1].length)
    );
    return lines.map(l => l.slice(minIndent)).join('\n');
}

function highlightCode(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
}
</script>

<template>
    <div :class="['chat', message.role === 'user' ? 'question' : 'answer']">
        <template v-for="(part, index) in splitMessage(message.content)" :key="index">
            <p v-if="part.type === 'text'" class="typewriter">{{ part.content }}</p>

            <div v-else-if="part.type === 'code'" class="code-block-wrapper">
                <div v-if="part.lang" class="code-lang-label">{{ part.lang }}</div>
                <pre class="code-block"><code v-html="highlightCode(part.content, part.lang)"></code></pre>
            </div>

        </template>
    </div>
    <span :class="['timestamp', message.role === 'user' ? 'timestamp-right' : 'timestamp-left']">
        {{ formatTimestamp(message.timestamp) }}
    </span>
</template>


<style scoped>
.answer {
    align-self: flex-start;
    color: black;
    padding: 2rem 0rem 2rem 0rem;
    width: 100%;
}

.question {
    max-width: 70%;
    padding: 0.75rem 1rem;
    margin: 0.5rem;
    word-wrap: break-word;

    align-self: flex-end;
    background-color: rgba(133, 67, 232, 0.67);
    color: snow;
    margin-left: auto;
    border-radius: 1rem 1rem 1rem 1rem;
}

.timestamp {
    font-size: 0.8rem;
    color: #afafaf;
    padding-right: 1rem;
}

.timestamp-left {
    text-align: left;
}

.timestamp-right {
    text-align: right;
}

.typewriter {
    font-family: monospace;
    white-space: pre-wrap;
}

.code-block-wrapper {
    max-width: 75%;
    margin: 1rem auto 1rem auto;
    font-family: monospace;
    user-select: text;
}

.code-lang-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #555;
    background: linear-gradient(to right,
            rgba(133, 67, 232, 0.67),
            rgba(0, 112, 240, 0.58),
            rgba(68, 213, 208, 0.54));
    padding: 0.25rem 0.75rem;
    border-radius: 0.5rem 0.5rem 0 0;
    border-bottom: none;
    box-shadow: inset 0 0 0 1000px rgba(187, 188, 190, 0.25);
}

.code-block {
    font-family: monospace;
    white-space: pre;
    padding: 1rem;
    overflow-x: auto;
    max-width: 100%;
    width: 100%;

    background: linear-gradient(white, white) padding-box,
        linear-gradient(to right,
            rgba(133, 67, 232, 0.67),
            rgba(0, 112, 240, 0.58),
            rgba(68, 213, 208, 0.54)) border-box;
    border: 3px solid transparent;
    border-radius: 0 0 0.5rem 0.5rem;
}
</style>
