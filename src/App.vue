<script setup>
import Board from "@/components/Board.vue";
import Score from "@/components/Score.vue";
</script>

<template>

  <div class="title">
    Крестики-нолики
  </div>

  <div class="game">
    <Board/>
    <Score/>
  </div>

</template>

<style scoped>
.title {
  font-size: 40px;
  color: beige;
  text-align: center;
  margin: 50px;
}

.game {
  margin: 50px auto;
  max-width: 324px;
}

</style>
