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
import { BodyState, MindState } from './player'

const { params } = useData()

const character = computed(() => {
  const slug = String(params.value?.name ?? '')
  return findCharacterBySlug(slug)
})

const hasImage = computed(
  () => !!character.value?.identity.appearanceUrl
)

const resonanceOpacity = computed(() => {
  if (!character.value?.status) return 0

  const value = character.value.status.resonance
  if (Number.isNaN(value)) return 0

  return Math.min(1, Math.max(0, value))
})

const subjectName = computed(() => {
  if (!character.value) return ''
  const parts = character.value.identity.fullName.split(' ').filter((part) =>
    /^[A-Za-zÀ-ÖØ-öø-ÿ'-]+$/.test(part)
  )
  if (parts.length === 1) return parts[0]
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

const bodyStatusLabel = (state: BodyState): string => {
  switch (state) {
    case BodyState.HEALTHY:
      return 'Saudável'
    case BodyState.HURT:
      return 'Ferido'
    case BodyState.DEEP_WOUNDS:
      return 'Feridas Graves'
  }
}

const mindStatusLabel = (state: MindState): string => {
  switch (state) {
    case MindState.SANE:
      return 'Lúcido'
    case MindState.UNSTABLE:
      return 'Abalado'
    case MindState.INSANE:
      return 'Quebrado'
  }
}

const bodyStatusClass = computed(() => {
  const state = character.value?.status.body

  switch (state) {
    case BodyState.HEALTHY:
      return 'border-[rgba(0,180,120,0.5)] bg-[rgba(0,180,120,0.08)] text-[rgba(0,200,140,0.9)]'
    case BodyState.HURT:
      return 'border-[rgba(255,190,60,0.55)] bg-[rgba(255,190,60,0.08)] text-[rgba(255,210,120,0.95)]'
    case BodyState.DEEP_WOUNDS:
      return 'border-[rgba(220,30,80,0.6)] bg-[rgba(220,30,80,0.08)] text-[rgba(255,150,170,0.95)]'
    default:
      return 'border-[color:var(--vp-c-border)] bg-[rgba(255,255,255,0.02)] text-[color:var(--vp-c-text-2)]'
  }
})

const mindStatusClass = computed(() => {
  const state = character.value?.status.mind

  switch (state) {
    case MindState.SANE:
      return 'border-[rgba(0,180,120,0.5)] bg-[rgba(0,180,120,0.08)] text-[rgba(0,200,140,0.9)]'
    case MindState.UNSTABLE:
      return 'border-[rgba(120,140,255,0.55)] bg-[rgba(120,140,255,0.08)] text-[rgba(180,195,255,0.95)]'
    case MindState.INSANE:
      return 'border-[rgba(160,60,255,0.6)] bg-[rgba(160,60,255,0.08)] text-[rgba(220,170,255,0.96)]'
    default:
      return 'border-[color:var(--vp-c-border)] bg-[rgba(255,255,255,0.02)] text-[color:var(--vp-c-text-2)]'
  }
})

</script>

<div class="max-w-5xl w-full mx-auto pt-7 pb-14 px-5 box-border flex flex-col md:px-0 md:pt-10">
  <div
    class="flex flex-col gap-8 min-[840px]:grid min-[840px]:grid-cols-[minmax(320px,1fr)_minmax(0,2fr)] min-[840px]:items-start">
    <aside class="flex flex-col gap-6">
      <div
        class="w-full max-w-full bg-[color:var(--vp-c-bg-soft)] border border-[color:var(--vp-c-border)] rounded-2xl overflow-hidden shadow-[0_0_12px_rgba(0,0,0,0.15)] min-[840px]:w-auto min-[840px]:max-w-[320px] min-[840px]:!mx-auto">
        <figure class="w-full overflow-hidden bg-[color:var(--vp-c-bg-soft)] flex flex-col justify-between !m-0">
          <template v-if="hasImage">
            <div class="relative w-full overflow-hidden">
              <img :src="character.identity.appearanceUrl" :style="{
                'object-position': `${character.identity.imageOffset.x}% ${character.identity.imageOffset.y}%`
              }" :alt="character.identity.fullName" class="block w-full h-auto aspect-[3/4] object-cover" />
              <div class="mt-3 flex absolute bottom-0 bg-[color:var(--vp-c-bg-soft)] w-full gap-2 text-left px-4 py-2 items-center justify-between">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[0.72rem] font-bold uppercase tracking-[0.09em] text-[color:var(--vp-c-text-1)]">
                    FÍSICO
                  </span>
                  <span class="px-[0.6rem] py-[0.18rem] rounded-full text-[0.75rem] border bg-[rgba(255,255,255,0.02)]"
                    :class="bodyStatusClass">
                    {{ bodyStatusLabel(character.status.body) }}
                  </span>
                </div>
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[0.72rem] font-bold uppercase tracking-[0.09em] text-[color:var(--vp-c-text-1)]">
                    MENTAL
                  </span>
                  <span class="px-[0.6rem] py-[0.18rem] rounded-full text-[0.75rem] border bg-[rgba(255,255,255,0.02)]"
                    :class="mindStatusClass">
                    {{ mindStatusLabel(character.status.mind) }}
                  </span>
                </div>
              </div>
              <div class="inset-0 absolute tv-static bg-blend-soft-light" :style="{ opacity: resonanceOpacity }"></div>
            </div>
            <figcaption
              class="border-t border-[color:var(--vp-c-divider)] !px-3 !py-2 text-[0.9rem] font-semibold uppercase !tracking-[0.08em] text-[color:var(--vp-c-text-2)] text-center">
              Aparência
            </figcaption>
          </template>
          <template v-else>
            <div
              class="w-full aspect-[3/4] flex items-center justify-center !p-3 !text-[0.8rem] !text-[color:var(--vp-c-text-2)] bg-[repeating-linear-gradient(135deg,_rgba(255,255,255,0.02),_rgba(255,255,255,0.02)_6px,_rgba(255,255,255,0.04)_6px,_rgba(255,255,255,0.04)_12px)]">
              <span>Sem aparência disponível</span>
            </div>
            <figcaption
              class="border-t border-[color:var(--vp-c-divider)] !px-3 !py-2 text-[0.9rem] font-semibold uppercase !tracking-[0.08em] text-[color:var(--vp-c-text-2)] text-center">
              Aguardando retrato :(
            </figcaption>
          </template>
        </figure>
        <section class="bg-[color:var(--vp-c-bg-soft)] !px-5 !py-4  text-left !mt-4 min-[840px]:!mt-0">
          <h2
            class="!text-[0.8rem] !font-semibold uppercase !tracking-[0.09em] !text-[color:var(--vp-c-text-3)] border-b border-[color:var(--vp-c-divider)] !pb-1 !mb-2">
            Atributos
          </h2>
          <ul class="list-none !p-[0.25rem_0] !m-0">
            <!-- Corpo -->
            <li
              class="flex justify-between items-center !py-[0.35rem] border-b border-[color:var(--vp-c-divider)] last:border-b-0">
              <span class="font-medium text-left">
                Corpo
              </span>
              <span
                class="tabular-nums text-right min-w-[2.5rem] inline-block relative !pb-[0.1rem] text-[color:var(--vp-c-text-3)] after:content-[''] after:inline-block after:w-5 after:h-1 after:bg-[color:var(--vp-c-divider)] after:rounded-[2px] after:!ml-[0.15rem] after:relative after:-top-px"
                :class="{
                  '!text-[color:var(--vp-c-brand-1)] after:!bg-[color:var(--vp-c-brand-1)]':
                    character.attributes.body > 0,
                  '!text-[color:var(--vp-c-danger-2)] after:!bg-[color:var(--vp-c-danger-2)]':
                    character.attributes.body < 0
                }">
                {{ formatAttribute(character.attributes.body) }}
              </span>
            </li>
            <li
              class="flex justify-between items-center !py-[0.35rem] border-b border-[color:var(--vp-c-divider)] last:border-b-0">
              <span class="font-medium text-left">
                Mente
              </span>
              <span
                class="tabular-nums text-right min-w-[2.5rem] inline-block relative !pb-[0.1rem] text-[color:var(--vp-c-text-3)] after:content-[''] after:inline-block after:w-5 after:h-1 after:bg-[color:var(--vp-c-divider)] after:rounded-[2px] after:!ml-[0.15rem] after:relative after:-top-px"
                :class="{
                  '!text-[color:var(--vp-c-brand-1)] after:!bg-[color:var(--vp-c-brand-1)]':
                    character.attributes.mind > 0,
                  '!text-[color:var(--vp-c-danger-2)] after:!bg-[color:var(--vp-c-danger-2)]':
                    character.attributes.mind < 0
                }">
                {{ formatAttribute(character.attributes.mind) }}
              </span>
            </li>
            <li
              class="flex justify-between items-center !py-[0.35rem] border-b border-[color:var(--vp-c-divider)] last:border-b-0">
              <span class="font-medium text-left">
                Carisma
              </span>
              <span
                class="tabular-nums text-right min-w-[2.5rem] inline-block relative !pb-[0.1rem] text-[color:var(--vp-c-text-3)] after:content-[''] after:inline-block after:w-5 after:h-1 after:bg-[color:var(--vp-c-divider)] after:rounded-[2px] after:!ml-[0.15rem] after:relative after:-top-px"
                :class="{
                  '!text-[color:var(--vp-c-brand-1)] after:!bg-[color:var(--vp-c-brand-1)]':
                    character.attributes.charisma > 0,
                  '!text-[color:var(--vp-c-danger-2)] after:!bg-[color:var(--vp-c-danger-2)]':
                    character.attributes.charisma < 0
                }">
                {{ formatAttribute(character.attributes.charisma) }}
              </span>
            </li>
            <!-- Vontade -->
            <li
              class="flex justify-between items-center py-[0.35rem] border-b border-[color:var(--vp-c-divider)] last:border-b-0">
              <span class="font-medium text-left">
                Vontade
              </span>
              <span
                class="tabular-nums text-right min-w-[2.5rem] inline-block relative pb-[0.1rem] text-[color:var(--vp-c-text-3)] after:content-[''] after:inline-block after:w-5 after:h-1 after:bg-[color:var(--vp-c-divider)] after:rounded-[2px] after:ml-[0.15rem] after:relative after:-top-px"
                :class="{
                  '!text-[color:var(--vp-c-brand-1)] after:!bg-[color:var(--vp-c-brand-1)]':
                    character.attributes.will > 0,
                  '!text-[color:var(--vp-c-danger-2)] after:!bg-[color:var(--vp-c-danger-2)]':
                    character.attributes.will < 0
                }">
                {{ formatAttribute(character.attributes.will) }}
              </span>
            </li>
          </ul>
          <p class="!mt-[.6rem] !text-[0.75rem] !leading-[1.5] !text-[color:var(--vp-c-text-3)] text-left">
            <span class="!text-[0.9rem] !leading-none !mt-[0.15rem] opacity-85" aria-hidden="true">
              ℹ︎
            </span>
            <span>
              Atributos variam entre <strong>-3</strong> (fraquíssimo) e
              <strong>+3</strong> (excepcional).
            </span>
          </p>
        </section>
      </div>
    </aside>
    <div class="flex flex-col gap-6">
      <section class="flex flex-wrap gap-8 items-start">
        <div class="flex-1 basis-[280px]">
          <div
            class="flex flex-wrap items-baseline gap-3 mb-3 max-[599px]:flex-col max-[599px]:items-start max-[599px]:gap-[0.35rem]">
            <h1 class="!text-[2rem] !font-bold !leading-[1.1] !m-0 !text-[color:var(--vp-c-text-1)]">
              {{ character.identity.fullName }}
            </h1>
            <span
              class="inline-flex items-center px-[0.65rem] py-[0.2rem] rounded-full text-[0.8rem] tracking-[0.02em] uppercase border border-[color:var(--vp-c-border)] bg-[color:var(--vp-c-bg-soft)] text-[color:var(--vp-c-text-1)]">
              {{ character.identity.occupation }}
            </span>
          </div>
          <dl class="flex gap-6 m-0 mb-8 text-[0.9rem] max-[520px]:flex-col max-[520px]:gap-3">
            <div>
              <dt class="text-[0.75rem] uppercase tracking-[0.08em] text-[color:var(--vp-c-text-3)]">
                Idade
              </dt>
              <dd class="m-0 mt-[0.1rem] text-[0.9rem] font-medium text-[color:var(--vp-c-text-1)]">
                {{ character.identity.age }}
              </dd>
            </div>
            <div>
              <dt class="text-[0.75rem] uppercase tracking-[0.08em] text-[color:var(--vp-c-text-3)]">
                Gênero
              </dt>
              <dd class="m-0 mt-[0.1rem] text-[0.9rem] font-medium text-[color:var(--vp-c-text-1)]">
                {{ character.identity.gender }}
              </dd>
            </div>
          </dl>
          <div class="flex flex-wrap gap-y-3 gap-x-6 text-[color:var(--vp-c-text-1)]">
            <div class="flex items-center gap-[0.4rem]">
              <span class="text-[0.75rem] uppercase tracking-[0.08em] text-[color:var(--vp-c-text-2)]">
                Personalidade
              </span>
              <span
                class="px-[0.7rem] py-[0.25rem] rounded-full text-[0.8rem] border border-[color:var(--vp-c-border)] bg-[rgba(255,255,255,0.02)]">
                {{ character.identity.personality }}
              </span>
            </div>
            <div class="flex items-center gap-[0.4rem]">
              <span class="text-[0.75rem] uppercase tracking-[0.08em] text-[color:var(--vp-c-text-2)]">
                Motivação
              </span>
              <span
                class="px-[0.7rem] py-[0.25rem] rounded-full text-[0.8rem] border border-[rgba(0,180,120,0.5)] bg-[rgba(0,180,120,0.08)]">
                {{ character.identity.motivation }}
              </span>
            </div>
            <div class="flex items-center gap-[0.4rem]">
              <span class="text-[0.75rem] uppercase tracking-[0.08em] text-[color:var(--vp-c-text-2)]">
                Medo
              </span>
              <span
                class="px-[0.7rem] py-[0.25rem] rounded-full text-[0.8rem] border border-[rgba(220,30,80,0.5)] bg-[rgba(220,30,80,0.08)]">
                {{ character.identity.fear }}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section class="pt-6 border-t border-[color:var(--vp-c-divider)]">
        <h2 class="!text-[0.9rem] uppercase !tracking-[0.14em] !text-[color:var(--vp-c-text-2)] !m-0 !mb-2">
          Arquivo - {{ subjectName }}
        </h2>
        <p class="leading-[1.7] max-w-[70ch] whitespace-pre-line m-0 text-[color:var(--vp-c-text-1)]">
          {{ character.identity.backstory }}
        </p>
      </section>
    </div>
  </div>
  <section
    class="mt-6 bg-[color:var(--vp-c-bg-soft)] px-7 py-6 border border-[color:var(--vp-c-border)] rounded-2xl shadow-[0_0_12px_rgba(0,0,0,0.15)] flex flex-col justify-between">
    <h2
      class="!text-[0.9rem] !font-semibold uppercase !tracking-[0.08em] text-[color:var(--vp-c-text-2)] border-b border-[color:var(--vp-c-divider)] !pb-[0.35rem] !mb-3">
      Perícias
    </h2>
    <div v-for="domain in filteredDomains" :key="domain" class="!pt-3 last:!mb-0 min-[840px]:relative">
      <div
        class="flex items-center gap-2 mb-[0.1rem] font-semibold tracking-[0.1em] min-[840px]:sticky min-[840px]:top-6 min-[840px]:z-[1] min-[840px]:bg-inherit min-[840px]:py-1">
        <span class="text-base font-semibold uppercase tracking-[0.08em] text-[color:var(--vp-c-text-1)]">
          {{ domainLabels[domain] }}
        </span>
      </div>
      <ul class="list-none p-[0.25rem_0] m-0">
        <li v-for="skill in skillsByDomain(character.skills, domain)" :key="skill.name"
          :style="{ '--skill-domain-color': domainColor(domain) }"
          class="flex justify-between items-start gap-3 border-b border-[color:var(--vp-c-divider)] border-l-[3px] border-l-[color:var(--skill-domain-color,_transparent)] bg-[rgba(255,255,255,0.02)] px-3 py-[0.4rem] flex-wrap min-[720px]:flex-nowrap min-[720px]:items-baseline last:border-b-0 ">
          <div class="flex-1 flex flex-direction flex-col gap-1">
            <div class="flex items-baseline gap-2">
              <span class="font-medium">
                {{ skill.name }}
              </span>
              <span class="text-[0.85rem] text-[color:var(--vp-c-text-2)]">
                Lv. {{ skill.level }}
              </span>
            </div>
            <p class="m-0 text-[0.85rem] leading-[1.4] text-[color:var(--vp-c-text-2)]">
              {{ skill.description }}
            </p>
          </div>
          <div class="flex flex-col items-center">
            <span v-if="skill.bonus"
              class="text-[0.65rem] px-[0.6rem] py-[0.18rem] rounded-full border border-[rgba(255,215,0,0.25)] bg-[rgba(255,215,0,0.04)]"
              title="+1 de nível concedido pela ocupação">
              + Ocupação
            </span>
          </div>
        </li>
      </ul>
    </div>
    <p class="!mt-5 !text-[0.8rem] !leading-[1.5] !text-[color:var(--vp-c-text-3)] !text-left">
      Perícias variam entre <strong>0</strong> a <strong>3</strong>.
      Perícias concedidas por ocupação são consideradas bônus.
    </p>
  </section>
</div>
