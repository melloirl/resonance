---
layout: page
sidebar: false
---

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { findCharacterBySlug } from './characters'
import { Domain, getDomainColor } from './skills'
import type { CharacterSkill } from './skills'

const { params } = useData()

const character = computed(() => {
  const slug = String(params.value?.name ?? '')
  return findCharacterBySlug(slug)
})

const hasImage = computed(
  () => !!character.value?.identity.appearanceUrl
)

const subjectName = computed(() => {
  if (!character.value) return ''
  const parts = character.value.identity.fullName.split(' ')
  if (parts.length === 1) return parts[0]
  // middle and last names initials
  const initials = parts.slice(1).map((n) => n[0].toUpperCase() + '.').join(' ')
  return `${parts[0]} ${initials}`
})

const formatAttribute = (value: number) =>
  value > 0 ? `+${value}` : String(value)

const domainLabels: Record<Domain, string> = {
  [Domain.PHYSICAL]: 'Físico',
  [Domain.INVESTIGATION]: 'Investigação',
  [Domain.TECHNICAL]: 'Técnico',
  [Domain.SOCIAL]: 'Social',
  [Domain.OCCULT]: 'Oculto',
  [Domain.COMBAT]: 'Combate',
}

const domainColor = (domain: Domain) => getDomainColor(domain)

const domains = [
  Domain.PHYSICAL,
  Domain.INVESTIGATION,
  Domain.TECHNICAL,
  Domain.SOCIAL,
  Domain.OCCULT,
  Domain.COMBAT,
] as const

const filteredDomains = computed(() => {
  if (!character.value) return []
  const charDomains = new Set<Domain>()
  character.value.skills.forEach((skill) => {
    charDomains.add(skill.domain)
  })
  return domains.filter((domain) => charDomains.has(domain))
})

const skillsByDomain = (skills: CharacterSkill[], domain: Domain) =>
  skills.filter((skill) => skill.domain === domain)
</script>

<div v-if="character" :class="$style.character_page">
  <section :class="$style.character_header">
    <div :class="$style.character_main">
      <div :class="$style.character_title_row">
  <h1 :class="$style.character_name">
    {{ character.identity.fullName }}
  </h1>
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
          :style="{'object-position': `${character.identity.imageOffset.x}% ${character.identity.imageOffset.y}%`}"
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
  <section :class="$style.character_story">
  <h2>Arquivo - {{subjectName}}</h2>
  <p :class="$style.character_backstory">
    {{ character.identity.backstory }}
  </p>
</section>
  <section :class="$style.character_grid">
    <section :class="$style.character_section">
  <h2>Atributos</h2>
  <ul :class="$style.attributes_list">
    <li :class="$style.attributes_row">
      <span
        :class="$style.attr_name"
        title="Corpo: força física, resistência e condicionamento."
      >
        Corpo
      </span>
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
      <span
        :class="$style.attr_name"
        title="Mente: raciocínio, memória e foco."
      >
        Mente
      </span>
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
      <span
        :class="$style.attr_name"
        title="Carisma: presença, empatia e capacidade de influência."
      >
        Carisma
      </span>
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
      <span
        :class="$style.attr_name"
        title="Vontade: determinação, coragem e resiliência mental."
      >
        Vontade
      </span>
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
    <span :class="$style.hint_icon" aria-hidden="true">ℹ︎</span>
    <span>
      Atributos variam entre <strong>-3</strong> (fraquíssimo) e
      <strong>+3</strong> (excepcional).
    </span>
  </p>
</section>
    <div :class="$style.character_section">
  <h2>Perícias</h2>
  <div
    v-for="domain in filteredDomains"
    :key="domain"
    :class="$style.skills_domain_group"
  >
    <div :class="$style.skills_domain_header">
      <span
        :class="$style.skills_domain_bar"
        :style="{ backgroundColor: domainColor(domain) }"
      />
      <span :class="$style.skills_domain_label">
        {{ domainLabels[domain] }}
      </span>
    </div>
    <ul :class="$style.skills_list">
      <li
        v-for="skill in skillsByDomain(character.skills, domain)"
        :key="skill.name"
        :class="$style.skills_row"
        :style="{ '--skill-domain-color': domainColor(domain) }"
      >
        <div :class="$style.skill_main">
          <div :class="$style.skill_header">
            <span :class="$style.skill_name">{{ skill.name }}</span>
            <span :class="$style.skill_level">
              Lv. {{ skill.level }}
            </span>
          </div>
          <p :class="$style.skill_description">
            {{ skill.description }}
          </p>
        </div>
        <div :class="$style.skill_meta">
          <span
            v-if="skill.bonus"
            :class="$style.skill_badge"
            title="+1 de nível concedido pela ocupação"
          >
            + Ocupação
          </span>
        </div>
      </li>
    </ul>
  </div>
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
  width: 100%;
  margin: 0 auto;
  padding: 1.75rem 1.25rem 3.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.character_page h2 {
  margin: 0 0 0.5rem;
}

.character_page > * + * {
  margin-top: 2.5rem;
}

@media (min-width: 840px) {
  .character_page {
    padding-inline: 0;
    padding-top: 2.5rem;
  }
}

.character_story {
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.character_story h2 {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--vp-c-text-2);
  margin: 0 0 0.5rem;
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
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.1;
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
  font-size: 0.8rem;
  padding: 0.2rem 0.65rem;
}

.character_meta {
  display: flex;
  gap: 1.5rem;
  margin: 0 0 2rem;
  font-size: 0.9rem;
}

@media (max-width: 520px) {
  .character_meta {
    flex-direction: column;
    gap: 0.75rem;
  }
}

.meta_item dt {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-3);
}

.meta_item dd {
  margin: 0.1rem 0 0;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
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
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.35rem;
  margin-bottom: 0.75rem;
}

.character_backstory {
  line-height: 1.7;
  max-width: 70ch;
  white-space: pre-line;
  margin: 0;
}

.character_grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;
  align-items: flex-start;
}

.character_grid > .character_section:first-child {
  padding: 0.75rem 1.5rem;
  min-width: 260px;
  align-self: start;
  text-align: right;
  box-shadow: 0 0 8px rgba(0,0,0,0.12);
}

@media (min-width: 840px) {
  .character_grid > .character_section:first-child {
    flex-shrink: 0;
  }
}

@media (min-width: 840px) {
  .character_grid {
    grid-template-columns: 280px minmax(0, 1fr);
  }
}

.character_grid > .character_section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  text-align: left;
}

.attr_value {
  font-variant-numeric: tabular-nums;
  text-align: right;
  min-width: 2.5rem;
  display: inline-block;
  position: relative;
  padding-bottom: 0.1rem;
  color: var(--vp-c-text-3);
}

.attr_value::after {
  content: '';
  display: inline-block;
  width: 1.25rem;
  height: 0.25rem;
  background: var(--vp-c-divider);
  border-radius: 2px;
  margin-left: 0.15rem;
  position: relative;
  top: -1px;
}

.attr_positive {
  color: var(--vp-c-brand-1);
}

.attr_positive::after {
  background: var(--vp-c-brand-1);
}

.attr_negative {
  color: var(--vp-c-danger-2);
}

.attr_negative::after {
  background: var(--vp-c-danger-2);
}

.hint {
  margin-top: 1.25rem;
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--vp-c-text-3);
  text-align: left;
}

.hint_icon {
  font-size: 0.9rem;
  line-height: 1;
  margin-top: 0.15rem;
  opacity: 0.85;
}

.skills_row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.35rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
  gap: 0.75rem;
  border-left: 3px solid var(--skill-domain-color, transparent);
  flex-wrap: wrap;
  background: rgba(255,255,255,0.02);
  border-radius: 0.5rem;
  padding: 0.4rem 0.75rem;
}

.skills_row:last-child {
  border-bottom: none;
}

@media (min-width: 720px) {
  .skills_row {
    flex-wrap: nowrap;
    align-items: baseline;
  }
}

.skill_main {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.skill_header {
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

.skill_description {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.skill_meta {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.skill_badge {
  font-size: 0.65rem;
  padding: 0.18rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 215, 0, 0.3); 
  background: rgba(255, 215, 0, 0.05);
  white-space: nowrap;
  line-height: 1.2;
  font-weight: 500;
}

.character_empty {
  padding: 4rem 0;
  text-align: center;
  color: var(--vp-c-text-2);
}

.skills_domain_group {
  margin-bottom: 1.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
  background: rgba(255, 255, 255, 0.015);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.08);
}

.skills_domain_group:last-of-type {
  margin-bottom: 0;
}

.skills_domain_header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.skills_domain_bar {
  width: 4px;
  height: 1rem;
  border-radius: 999px;
}

.skills_domain_label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-1);
}

@media (min-width: 840px) {
  .skills_domain_group {
    position: relative;
  }

  .skills_domain_header {
    position: sticky;
    top: 1.5rem;
    z-index: 1;
    background: inherit;
    padding-block: 0.25rem;
  }
}

.character_section,
.character_portrait,
.skills_domain_group {
  border-radius: 1rem;
}

.character_section,
.character_portrait {
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
}

.attributes_list,
.skills_list {
  padding: 0.5rem 0;
  margin: 0;
  list-style: none;
}

.character_title_row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 599px) {
  .character_title_row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }
}
</style>
