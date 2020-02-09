<template>
  <div class="markdown-help">
    <h1>Markdown-hjälp</h1>

    <div class="paragraph">
      <strong>Listor:</strong><br />
      <ul>
        <li>* röd</li>
        <li>* grön</li>
        <li>* blå</li>
      </ul>
      <ul>
        <li>1. röd</li>
        <li>2. grön</li>
        <li>3. blå</li>
      </ul>
    </div>

    <div class="paragraph">
      <strong>Fet stil:</strong><br />
      <ul>
        <li>**dubbla stjärnor**</li>
      </ul>
    </div>

    <div class="paragraph">
      <strong>Kursiv stil:</strong><br />
      <ul>
        <li>*enkla stjärnor*</li>
      </ul>
    </div>

    <div class="paragraph">
      <strong>Länkar:</strong><br />
      <ul>
        <li>[Exempellänk](https://exempel.se)</li>
      </ul>
    </div>

    <!-- <p class="documentation">
      <a href="https://daringfireball.net/projects/markdown/syntax" target="_blank">Markdown-dokumentation</a>
    </p> -->
  </div>
</template>

<!-- ####################################################################### -->
<script>
export default {
  name: "MarkdownHelp"
}
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
  padding-bottom: 0.8em;
}

.markdown-help ul {
  list-style-type: none;
  padding-left: 1em;
  font-family: var(--monofont);
  font-weight: lighter;
}

.paragraph {
  margin-left: 0.8em;
}

.documentation {
  text-align: center;
}
</style>
