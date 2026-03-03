<script setup lang="ts">
import type { ClaudeInstance } from "../common/types";
import { getSvg, generateCharacter } from "../common/character";
import { computed, onMounted, onUnmounted, ref } from "vue";

const emptyCharacter = generateCharacter(0);

const instances = ref<ClaudeInstance[]>([]);
const frameIndex = ref(0);

const projectGroups = computed(() => {
  const map = new Map<string, ClaudeInstance[]>();
  for (const inst of instances.value) {
    const group = map.get(inst.project);
    if (group) group.push(inst);
    else map.set(inst.project, [inst]);
  }
  return map;
});

function onCatClick(id: string) {
  window.api.focusInstance(id);
}

function catSvgDataUri(inst: ClaudeInstance): string {
  const svg = getSvg(inst.character, inst.state, frameIndex.value);
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

let animFrameId: number;
let lastFrameTime = 0;
const FRAME_INTERVAL = 300;

function animate(timestamp: number) {
  if (timestamp - lastFrameTime >= FRAME_INTERVAL) {
    frameIndex.value++;
    lastFrameTime = timestamp;
  }
  animFrameId = requestAnimationFrame(animate);
}

onMounted(async () => {
  instances.value = await window.api.getInstances();
  animFrameId = requestAnimationFrame(animate);
});

let cleanup: (() => void) | null = null;
onMounted(() => {
  cleanup = window.api.onInstancesChanged((updated) => {
    instances.value = updated;
  });
});
onUnmounted(() => {
  cleanup?.();
  cancelAnimationFrame(animFrameId);
});
</script>

<template>
  <div class="container">
    <div v-if="instances.length === 0" class="empty">
      <img
        :src="'data:image/svg+xml,' + encodeURIComponent(getSvg(emptyCharacter, 'idle', 0))"
        class="empty-cat"
        alt="sleeping cat"
      />
      <span class="empty-text">No cats here yet</span>
    </div>
    <div v-else class="project-list">
      <div
        v-for="[project, members] in projectGroups"
        :key="project"
        class="project-row"
      >
        <div class="project-label">
          {{ project }}
        </div>
        <div class="avatar-tray">
          <div
            v-for="inst in members"
            :key="inst.id"
            class="avatar-wrap"
            @click="onCatClick(inst.id)"
          >
            <img
              :src="catSvgDataUri(inst)"
              class="avatar-cat"
              :alt="inst.name"
            />
            <span class="avatar-status">{{
              inst.state === "waiting_for_input" ? "waiting" : inst.state
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "./index.css";
</style>
