<template>
  <div class="markdown-help">
    <h1>Markdown-hjälp</h1>

    <p>
      <strong>Kursiv stil:</strong><br>
      <ul>
        <li>*single asterisks*</li>
      </ul>
    </p>
    <p>
      <strong>Fet stil:</strong><br>
      <ul>
        <li>**double asterisks**</li>
      </ul>
    </p>
    <p>
      <strong>Rubriker:</strong><br>
      <ul>
        <li># This is an H1</li>
        <li>## This is an H2</li>
        <li>###### This is an H6</li>
      </ul>
    </p>
    <p>
      <strong>Listor:</strong><br>
      <ul>
        <li>- Red</li>
        <li>- Green</li>
        <li>- Blue</li><br>

        <li>1. Red</li>
        <li>2. Green</li>
        <li>3. Blue</li>
      </ul>
    </p>
    <p>
      <strong>Länkar:</strong><br>
      <ul>
        <li>[Den här länken](http://example.com) leder ingenstans.</li>
      </ul>
    </p>

    <p>
      <a href="https://daringfireball.net/projects/markdown/syntax" target="_blank">Markdown-dokumentation</a>
    </p>
  </div>
</template>

<!-- ####################################################################### -->
<script>
export default {
  name: "MarkdownHelp"
};
</script>

<!-- ####################################################################### -->

<style scoped>
.markdown-help {
  text-align: left;
  font-size: 0.9rem;
}

h1 {
  text-align: center;
  font-size: 1.4em;
}

.markdown-help ul {
  list-style-type: none;
  padding-left: 1em;
}

p {
  margin-left: 0.8em;
}
</style>
