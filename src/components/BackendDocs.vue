<script setup>
import { ref, onMounted } from 'vue';
import { marked } from 'marked';

const convertedMarkdown = ref('');

onMounted(async () => {
  const response = await fetch('/docs.md');
  const markdownFile = await response.text();
  convertedMarkdown.value = marked(markdownFile);
});
</script>

<template>
  <div class="docs" v-html="convertedMarkdown"></div>
</template>

<style>
.docs {
    font-family: var(--title-font);
    padding: 30px 15px 50px; 
}
.docs h1, .docs h2, .docs h3, .docs h4, .docs h5 {
    color: var(--primary);
    padding: 5px 0;
    font-weight: 600;
}
.docs ul {
    list-style: square;
}
.docs pre {
    background: #ccc;
    padding: 5px 15px;
    border-radius: 5px;
    overflow-x: auto;
}
.docs a {
    display: inline;
    font-weight: 600;
    color: var(--primary);
    text-decoration: underline;
}
.docs code {
    background: #ccc;
    font-family: var(--code);
    font-size: 13px;
    color: black;
    padding: 1px;
    border-radius: 2px;

}
</style>