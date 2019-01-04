<template>
  <div class="markdown-help">
    <h4>Markdown-hjälp</h4>

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

    <a href="https://daringfireball.net/projects/markdown/syntax">(Markdown-dokumentation)</a>
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
}

.markdown-help ul {
  list-style-type: none;
  padding-left: 1em;
}
</style>
