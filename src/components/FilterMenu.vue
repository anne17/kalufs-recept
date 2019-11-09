<template>
  <div class="filter">
    <router-link class="filter-reset" to="/" title="Visa alla recept">
      <i class="fas fa-filter"></i>
      <span>
        Rensa filter
      </span>
    </router-link>
    <div class="filter-category container" v-for="cat in tagStructureSimple" :key="cat.id">
      <div class="filter-category-header caps-header row" :class="{'no-children': cat.tags.length == 0, 'tags-hidden': !activeCats.includes(cat.category)}" @click="$emit('toggleCategoryFilter', cat.category)">
        {{ cat.category }}
      </div>
      <div>
        <div class="filter-tag row" v-for="tag in cat.tags" :key="tag.id" title="Filtrera på denna tagg" @click="$emit('clickTag', tag)">
          <span :class="{'active-tag': activeTags.includes(tag), tag: activeTags.includes(tag)}">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- ####################################################################### -->
<script>
export default {
  name: "FilterMenu",
  props: [
    "tagStructureSimple",
    "activeTags",
    "activeCats"
  ]
};
</script>

<!-- ####################################################################### -->

<style scoped>
.filter-reset {
  font-family: var(--headerfont);
  display: block;
  text-align: left;
  background: var(--primary-color-5);
  padding: 0.3em 0.5em 0.3em 0.5em;
  margin-bottom: 0.5em;
  border: 1px solid var(--primary-color-5);
  border-radius: 5px;
  text-decoration: none;
  color: unset;
  cursor: pointer;
}
.filter-reset:hover {
  color: black;
}

i.fas.fa-filter {
    position: relative;
}
i.fas.fa-filter::after {
    content: "⨯";
    position: absolute;
    top: 5px;
    left: 10px;
    font-size: 12px;
    font-weight: normal;
}

.filter-category {
  text-align: left;
  margin-bottom: 0.5em;
}

.filter-category-header {
  background: var(--primary-color-5);
  border: 1px solid var(--primary-color-5);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 0.3em 0.5em 0.3em 1em;
  font-weight: 500;
  cursor: pointer;
}
.filter-category-header::before{
  position: relative;
  top: 10px;
  right: 4px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid var(--standard-font-color);
  content: "";
  pointer-events: none;
}
.filter-category-header.tags-hidden::before{
  position: relative;
  top: 6px;
  right: 4px;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid var(--standard-font-color);
  content: "";
  pointer-events: none;
  height: 0;
}
.filter-category-header.tags-hidden,
.filter-category-header.no-children
 {
  border: 1px solid var(--primary-color-5);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.filter-category-header.no-children {
  cursor: auto;
}
.filter-category-header.tags-hidden + div {
  display: none;
}

.filter-tag {
  background: var(--primary-color-4);
  padding: 0.2em 0.5em 0.2em 1.5em;
  font-weight: normal;
  border: 1px solid var(--primary-color-4);
  text-decoration: none;
  color: unset;
  cursor: pointer;
}
.filter-tag span {
  overflow: hidden;
  text-overflow: ellipsis;
}
.filter-tag:hover {
  background: var(--primary-color-5);
  border: 1px solid var(--primary-color-5);
}
.filter-category-header:last-child,
.filter-tag:last-child {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.active-tag:hover::after {
  position: absolute;
  content: "\00d7";
  right: 25px;
}
</style>
