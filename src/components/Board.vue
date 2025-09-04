<script setup>
import Cell from "@/components/Cell.vue";
import {ref} from "vue";
import gameProcess from "@/utils/game-process.js";

// получение функции о победителе игры из App.vue
const emit = defineEmits(['end']);
// переменная ячеек игры и их состояния
const board = ref([
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]);

// перемнная блокировки хода игрока до хода бота
let locked = false;

// функция получения данных из дочернего компонента Cell.vue - ход человека х
function doMoveHandler(i, j, value) {
  // не даем пользователю сходить, если не сходил бот
  if(locked) return true;
  // присваиваем значение х при нажатии на ячейку
  board.value[i][j] = value;
//   проверяем на выигрыш
  if (gameProcess.checkPlayerWin(board.value, 'x')) {
    emit('end', 'user');
  } else {
    //   вызов функции хода бота
    botMove();
  }
}

// функция хода бота о - с использованием утилиты game-process.js
function botMove() {
  locked = true;
  setTimeout(() => {
    const botMoving = gameProcess.botMoving(board.value);
    if (botMoving) {
      board.value[botMoving.i][botMoving.j] = 'o';
      if (gameProcess.checkPlayerWin(board.value, 'o')) {
        emit('end', 'bot');
      }
    } else {
      emit('end', 'draw');
    }
    locked = false;
  }, 500);
}

// функция завершения игры
function endGame() {
  setTimeout(() => {
    board.value = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]
  }, 500)
}
// передача данных о завершении игры в родительский компонент App.vue
defineExpose({endGame});

</script>

<template>
  <div class="board">
    <!--проходимся по массиву с ячейками, а затем по массиву строк с ячейками -->
    <template v-for="(iValue, i) in board">
      <template v-for="(jValue, j) in iValue">
        <!--происходит обработка дочернего компонента с передачей функции и значений в ней value=x -->
        <Cell :value="jValue" @do-move="(value) => doMoveHandler(i, j, value)"/>
      </template>
    </template>
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  border: 3px solid beige;
}

</style>
