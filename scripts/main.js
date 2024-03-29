"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const graphId = document.getElementById("graph");
const btnBubbleSort = document.getElementById("btn_bubble");
const btnInsertSort = document.getElementById("btn_insertion");
const btnSelectionSort = document.getElementById("btn_selection");
const btnQuickSort = document.getElementById("btn_quick");
const arrSizeInput = document.getElementById("arr_size_input");
const arrSortSpeedInput = document.getElementById("arr_speed_input");
const btnHeapSort = document.getElementById("btn_heap");
const buttons = document.querySelectorAll(".nav_btn");
let arr = [];
let sortSpeed = 75;
// function that generates our random array
const generateArray = (arr_size) => {
    arr = Array(arr_size).fill(0, 0).map(() => Math.floor(Math.random() * 300));
    removeGraphItems();
    createGraphItems(arr);
};
// function that takes an array as argument, creates div elements with height = arr[i] value, and appends them to  our graphId div
const createGraphItems = (arr) => {
    arr.forEach(item => {
        const el = document.createElement("div");
        el.style.height = `${item.toString()}px`;
        el.classList.add("item");
        graphId.append(el);
    });
};
// function that removes our columns in graph, so we can reder the once more later
const removeGraphItems = () => {
    graphId.innerHTML = "";
};
// function that returns promise, we are using it to control render time
const sleep = () => {
    return new Promise(resolve => setTimeout(resolve, sortSpeed));
};
const disableMenuBtns = (props) => {
    if (props) {
        buttons.forEach(el => el.disabled = true);
        arrSizeInput.disabled = true;
    }
    else {
        buttons.forEach(el => el.disabled = false);
        arrSizeInput.disabled = false;
    }
    ;
};
// ========= SORTING FUNCTIONS ===============
//------------Bubble Sort ---------------------
function bubbleSort(inputArr) {
    return __awaiter(this, void 0, void 0, function* () {
        let len = inputArr.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - 1; j++) {
                //colorize(j,j+1)
                yield sleep();
                if (inputArr[j] > inputArr[j + 1]) {
                    let tmp = inputArr[j];
                    inputArr[j] = inputArr[j + 1];
                    inputArr[j + 1] = tmp;
                    removeGraphItems();
                    createGraphItems(inputArr);
                }
                ;
            }
            ;
        }
        ;
    });
}
;
// ----------- Insertion Sort ------------------
function insertionSort(inputArr) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 1; i < inputArr.length; i++) {
            let current = inputArr[i];
            let j = i - 1;
            while ((j > -1) && (current < inputArr[j])) {
                yield sleep();
                removeGraphItems();
                createGraphItems(inputArr);
                inputArr[j + 1] = inputArr[j];
                j--;
            }
            ;
            inputArr[j + 1] = current;
        }
        ;
    });
}
;
// ------------- Selection Sort --------------------
function selectionSort(arr) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < arr.length; i++) {
            let min = i;
            for (let j = i + 1; j < arr.length; j++) {
                // colorize(min,j);
                yield sleep();
                if (arr[j] < arr[min]) {
                    min = j;
                }
                ;
            }
            ;
            let temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
            removeGraphItems();
            createGraphItems(arr);
        }
        ;
    });
}
;
//---------------- Quick Sort -----------------------
function quickSort(arr, left, right) {
    return __awaiter(this, void 0, void 0, function* () {
        removeGraphItems();
        createGraphItems(arr);
        let i, j, x;
        i = j = left;
        yield sleep();
        while (i < right) {
            if (arr[i] <= arr[right]) {
                x = arr[j];
                arr[j] = arr[i];
                arr[i] = x;
                j++;
            }
            ;
            removeGraphItems();
            createGraphItems(arr);
            yield sleep();
            i++;
        }
        ;
        x = arr[j];
        arr[j] = arr[right];
        arr[right] = x;
        if (left < j - 1) {
            quickSort(arr, left, j - 1);
        }
        ;
        if (j + 1 < right) {
            quickSort(arr, j + 1, right);
        }
        ;
    });
}
;
//============== heap sort ==============================
function heapSort(array) {
    return __awaiter(this, void 0, void 0, function* () {
        let size = array.length;
        for (let i = Math.floor(size / 2 - 1); i >= 0; i--) {
            yield heapify(array, size, i);
        }
        ;
        for (let i = size - 1; i >= 0; i--) {
            let temp = array[0];
            array[0] = array[i];
            array[i] = temp;
            yield heapify(array, i, 0);
        }
        ;
    });
}
;
function heapify(array, size, i) {
    return __awaiter(this, void 0, void 0, function* () {
        let max = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        removeGraphItems();
        createGraphItems(arr);
        yield sleep();
        if (left < size && array[left] > array[max]) {
            max = left;
        }
        ;
        if (right < size && array[right] > array[max]) {
            max = right;
        }
        ;
        if (max != i) {
            let temp = array[i];
            array[i] = array[max];
            array[max] = temp;
            yield heapify(array, size, max);
        }
        ;
    });
}
;
// ======================================================
generateArray(200);
btnBubbleSort.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    disableMenuBtns(true);
    yield bubbleSort(arr);
    disableMenuBtns(false);
}));
btnInsertSort.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    disableMenuBtns(true);
    yield insertionSort(arr);
    disableMenuBtns(false);
}));
btnSelectionSort.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    disableMenuBtns(true);
    yield selectionSort(arr);
    disableMenuBtns(false);
}));
btnQuickSort.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    disableMenuBtns(true);
    yield quickSort(arr, 0, arr.length - 1);
    disableMenuBtns(false);
}));
arrSizeInput.addEventListener("change", (event) => {
    generateArray(parseInt(event.target.value));
});
arrSortSpeedInput.addEventListener("change", (event) => {
    sortSpeed = parseInt(event.target.value);
});
btnHeapSort.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    disableMenuBtns(true);
    yield heapSort(arr);
    disableMenuBtns(false);
}));
//============================================
