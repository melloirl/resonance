---
layout: page
sidebar: false
---

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { findCharacterBySlug } from './characters'

const { params } = useData()

const character = computed(() => {
  const slug = String(params.value?.name ?? '')
  return findCharacterBySlug(slug)
})

const hasImage = computed(
  () => !!character.value?.identity.appearanceUrl
)

const formatAttribute = (value: number) =>
  value > 0 ? `+${value}` : String(value)
</script>

<div v-if="character" :class="$style.character_page">
  <section :class="$style.character_header">
    <div :class="$style.character_main">
      <h1 :class="$style.character_name">
        {{ character.identity.fullName }}
      </h1>
      <div :class="$style.character_subtitle">
        <span :class="[$style.pill, $style.pill_occupation]">
          {{ character.identity.occupation }}
        </span>
      </div>
      <dl :class="$style.character_meta">
        <div :class="$style.meta_item">
          <dt>Idade</dt>
          <dd>{{ character.identity.age }}</dd>
        </div>
        <div :class="$style.meta_item">
          <dt>Gênero</dt>
          <dd>{{ character.identity.gender }}</dd>
        </div>
      </dl>
      <div :class="$style.character_tags">
        <div :class="$style.tag_group">
          <span :class="$style.tag_label">Personalidade</span>
          <span :class="[$style.chip, $style.chip_personality]">
            {{ character.identity.personality }}
          </span>
        </div>
        <div :class="$style.tag_group">
          <span :class="$style.tag_label">Motivação</span>
          <span :class="[$style.chip, $style.chip_motivation]">
            {{ character.identity.motivation }}
          </span>
        </div>
        <div :class="$style.tag_group">
          <span :class="$style.tag_label">Medo</span>
          <span :class="[$style.chip, $style.chip_fear]">
            {{ character.identity.fear }}
          </span>
        </div>
      </div>
    </div>
    <figure :class="$style.character_portrait">
      <template v-if="hasImage">
        <img
          :src="character.identity.appearanceUrl"
          :alt="character.identity.fullName"
        />
        <figcaption>Aparência</figcaption>
      </template>
      <template v-else>
        <div :class="$style.portrait_placeholder">
          <span>Sem aparência disponível</span>
        </div>
        <figcaption>Aguardando retrato :(</figcaption>
      </template>
    </figure>
  </section>
  <section :class="$style.character_section">
    <h2>História</h2>
    <p :class="$style.character_backstory">
      {{ character.identity.backstory }}
    </p>
  </section>
  <section :class="$style.character_grid">
    <div :class="$style.character_section">
      <h2>Atributos</h2>
      <ul :class="$style.attributes_list">
        <li :class="$style.attributes_row">
          <span :class="$style.attr_name">Corpo</span>
          <span
            :class="{
              [$style.attr_value]: true,
              [$style.attr_positive]: character.attributes.body > 0,
              [$style.attr_negative]: character.attributes.body < 0
            }"
          >
            {{ formatAttribute(character.attributes.body) }}
          </span>
        </li>
        <li :class="$style.attributes_row">
          <span :class="$style.attr_name">Mente</span>
          <span
            :class="{
              [$style.attr_value]: true,
              [$style.attr_positive]: character.attributes.mind > 0,
              [$style.attr_negative]: character.attributes.mind < 0
            }"
          >
            {{ formatAttribute(character.attributes.mind) }}
          </span>
        </li>
        <li :class="$style.attributes_row">
          <span :class="$style.attr_name">Carisma</span>
          <span
            :class="{
              [$style.attr_value]: true,
              [$style.attr_positive]: character.attributes.charisma > 0,
              [$style.attr_negative]: character.attributes.charisma < 0
            }"
          >
            {{ formatAttribute(character.attributes.charisma) }}
          </span>
        </li>
        <li :class="$style.attributes_row">
          <span :class="$style.attr_name">Vontade</span>
          <span
            :class="{
              [$style.attr_value]: true,
              [$style.attr_positive]: character.attributes.will > 0,
              [$style.attr_negative]: character.attributes.will < 0
            }"
          >
            {{ formatAttribute(character.attributes.will) }}
          </span>
        </li>
      </ul>
      <p :class="$style.hint">
        Atributos variam entre <strong>-3</strong> (fraquíssimo) e
        <strong>+3</strong> (excepcional).
      </p>
    </div>
    <div :class="$style.character_section">
      <h2>Perícias</h2>
      <ul :class="$style.skills_list">
        <li
          v-for="skill in character.skills"
          :key="skill.name"
          :class="$style.skills_row"
        >
          <div :class="$style.skill_main">
            <span :class="$style.skill_name">{{ skill.name }}</span>
            <span :class="$style.skill_level">
              Lv. {{ skill.level }}
            </span>
          </div>
          <span
            v-if="skill.bonus"
            :class="$style.skill_badge"
            title="+1 de nível concedido pela ocupação"
          >
            Bônus de Ocupação
          </span>
        </li>
      </ul>
      <p :class="$style.hint">
        Perícias variam entre <strong>0</strong> a <strong>3</strong>.
        Perícias concedidas por ocupação são consideradas bônus.
      </p>
    </div>
  </section>
</div>
<div v-else :class="$style.character_empty">
  <p>Personagem não encontrado :(</p>
</div>

<style module>
.character_page {
  max-width: 980px;
  margin: 0 auto;
  padding: 2rem 0 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.character_header {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;
}

.character_main {
  flex: 1 1 280px;
}

.character_name {
  font-size: 2.4rem;
  font-weight: 700;
  margin: 0 0 1.5rem;
}

.character_subtitle {
  margin-bottom: 1rem;
}

.pill {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  border: 1px solid var(--vp-c-border);
}

.pill_occupation {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.character_meta {
  display: flex;
  gap: 1.5rem;
  margin: 0 0 1.5rem;
}

.meta_item dt {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-2);
}

.meta_item dd {
  margin: 0.1rem 0 0;
  font-weight: 500;
}

.character_tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
}

.tag_group {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.tag_label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-2);
}

.chip {
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  font-size: 0.8rem;
  border: 1px solid var(--vp-c-border);
}

.chip_personality {
  background: rgba(255, 255, 255, 0.02);
}

.chip_motivation {
  background: rgba(0, 180, 120, 0.08);
  border-color: rgba(0, 180, 120, 0.5);
}

.chip_fear {
  background: rgba(220, 30, 80, 0.08);
  border-color: rgba(220, 30, 80, 0.5);
}

.character_portrait {
  flex: 0 0 230px;
  border-radius: 1rem;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.character_portrait img {
  display: block;
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.portrait_placeholder {
  flex: 1;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  background: repeating-linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.02),
    rgba(255, 255, 255, 0.02) 6px,
    rgba(255, 255, 255, 0.04) 6px,
    rgba(255, 255, 255, 0.04) 12px
  );
}

.character_portrait figcaption {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.character_section {
  background: var(--vp-c-bg-soft);
  border-radius: 1rem;
  padding: 1.5rem 1.75rem;
  border: 1px solid var(--vp-c-border);
}

.character_section + .character_section {
  margin-top: 1rem;
}

@media (min-width: 840px) {
  .character_section + .character_section {
    margin-top: 0;
  }
}

.character_section h2 {
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.character_backstory {
  line-height: 1.7;
}

.character_grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;
  align-items: stretch;
}

@media (min-width: 840px) {
  .character_grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
}

.character_grid > .character_section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hint {
  margin-top: 0.75rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.attributes_list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.attributes_row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.35rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.attributes_row:last-child {
  border-bottom: none;
}

.attr_name {
  font-weight: 500;
}

.attr_value {
  font-variant-numeric: tabular-nums;
}

.attr_positive {
  color: var(--vp-c-brand-1);
}

.attr_negative {
  color: var(--vp-c-danger-2);
}

.skills_list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.skills_row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.35rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
  gap: 0.75rem;
}

.skills_row:last-child {
  border-bottom: none;
}

.skill_main {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.skill_name {
  font-weight: 500;
}

.skill_level {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.skill_badge {
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 215, 0, 0.5);
  background: rgba(255, 215, 0, 0.08);
}

.character_empty {
  padding: 4rem 0;
  text-align: center;
  color: var(--vp-c-text-2);
}
</style>
