let speed = 0;

// Генерация случайного массива чисел
function generateRandomArray(length, min, max) {
  return Array.from({ length: length }, () => Math.floor(Math.random() * (max - min + 1) + min));
}
// Отрисовка массива чисел
function drawArray(array) {
  const arrayContainer = document.getElementById('array-container');
  arrayContainer.innerHTML = '';
  array.forEach((value) => {
    const bar = document.createElement('div');
    bar.classList.add('array-bar');
    bar.style.height = `${value}px`;
    arrayContainer.appendChild(bar);
  });
}
// Задержка выполнения
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// Сортировка пузырьком
async function bubbleSort(array) {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        drawArray(array);
        await sleep(speed);
      }
    }
  }
}
// Сортировка выбором
async function selectionSort(array) {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
    drawArray(array);
    await sleep(speed);
  }
}
// Сортировка вставками
async function insertionSort(array) {
  const n = array.length;
  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
    drawArray(array);
    await sleep(speed);
  }
}
// Быстрая сортировка
async function quickSort(array, low, high) {
  if (low < high) {
    const pivotIndex = await partition(array, low, high);
    await quickSort(array, low, pivotIndex - 1);
    await quickSort(array, pivotIndex + 1, high);
  }
}
async function partition(array, low, high) {
  const pivot = array[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      drawArray(array);
      await sleep(speed);
    }
  }
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  drawArray(array);
  await sleep(speed);
  return i + 1;
}
// Сортировка слиянием
async function mergeSort(array, left, right) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    await mergeSort(array, left, mid);
    await mergeSort(array, mid + 1, right);
    await merge(array, left, mid, right);
  }
}
async function merge(array, left, mid, right) {
  const n1 = mid - left + 1;
  const n2 = right - mid;
  const leftArray = new Array(n1);
  const rightArray = new Array(n2);
  for (let i = 0; i < n1; i++) {
    leftArray[i] = array[left + i];
  }
  for (let j = 0; j < n2; j++) {
    rightArray[j] = array[mid + 1 + j];
  }
  let i = 0;
  let j = 0;
  let k = left;
  while (i < n1 && j < n2) {
    if (leftArray[i] <= rightArray[j]) {
      array[k] = leftArray[i];
      i++;
    } else {
      array[k] = rightArray[j];
      j++;
    }
    k++;
    drawArray(array);
    await sleep(speed);
  }
  while (i < n1) {
    array[k] = leftArray[i];
    i++;
    k++;
    drawArray(array);
    await sleep(speed);
  }
  while (j < n2) {
    array[k] = rightArray[j];
    j++;
    k++;
    drawArray(array);
    await sleep(speed);
  }
}
// Инициализация
let array = generateRandomArray(200, 100, 700);
drawArray(array);
document.getElementById('start-btn').addEventListener('click', () => {
  const algorithmSelect = document.getElementById('algorithm');
  const selectedAlgorithm = algorithmSelect.value;
  switch (selectedAlgorithm) {
    case 'bubble':
      bubbleSort([...array]);
      break;
    case 'selection':
      selectionSort([...array]);
      break;
    case 'insertion':
      insertionSort([...array]);
      break;
    case 'quick':
      quickSort([...array], 0, array.length - 1);
      break;
    case 'merge':
      mergeSort([...array], 0, array.length - 1);
      break;
  }
});
document.getElementById('stop-btn').addEventListener('click', () => {
  location.reload();
});
