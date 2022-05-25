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
let arr = [];
let sorted_arr_copy = [];
let sortSpeed = 150;
// function that generates our random array
const generateArray = (arr_size) => {
    arr = Array(arr_size).fill(0, 0).map(() => Math.floor(Math.random() * 300));
    sorted_arr_copy = JSON.parse(JSON.stringify(arr));
    sorted_arr_copy.sort((a, b) => a - b);
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
// functions that colors our actual compared numbers, it takes 2 numbers (array indexes of compared numbers) and then we are adding styles to them 
const colorize = (num_1, num_2) => {
    const nodes = document.querySelectorAll(".item");
    nodes.forEach(el => {
        el.classList.remove("compare");
    });
    nodes[num_1].classList.add("compare");
    nodes[num_2].classList.add("compare");
};
// function thath compare positions of sorted array with unsorted one.
// If we sort unsorted array and one of the number is in the correct spot i.e. number is sorted its beign highlighted on yellow
const compare_pos = () => {
    const nodes = document.querySelectorAll(".item");
    for (let i = 0; i < sorted_arr_copy.length; i++) {
        if (sorted_arr_copy[i] === arr[i]) {
            nodes[i].style.backgroundColor = "#FFD12A";
        }
        ;
    }
    ;
};
// ========= SORTING FUNCTIONS ===============
//------------Bubble Sort ---------------------
function bubbleSort(inputArr) {
    return __awaiter(this, void 0, void 0, function* () {
        disableMenu(true);
        let len = inputArr.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - 1; j++) {
                colorize(j, j + 1);
                yield sleep();
                if (inputArr[j] > inputArr[j + 1]) {
                    let tmp = inputArr[j];
                    inputArr[j] = inputArr[j + 1];
                    inputArr[j + 1] = tmp;
                    removeGraphItems();
                    createGraphItems(inputArr);
                }
                ;
                compare_pos();
            }
            ;
        }
        ;
        compare_pos();
        disableMenu(false);
    });
}
;
// ----------- Insertion Sort ------------------
function insertionSort(inputArr) {
    return __awaiter(this, void 0, void 0, function* () {
        disableMenu(true);
        for (let i = 1; i < inputArr.length; i++) {
            let current = inputArr[i];
            let j = i - 1;
            while ((j > -1) && (current < inputArr[j])) {
                colorize(i, j);
                yield sleep();
                removeGraphItems();
                createGraphItems(inputArr);
                compare_pos();
                inputArr[j + 1] = inputArr[j];
                j--;
            }
            ;
            inputArr[j + 1] = current;
        }
        ;
        compare_pos();
        disableMenu(false);
    });
}
;
// ------------- Selection Sort --------------------
function selectionSort(arr) {
    return __awaiter(this, void 0, void 0, function* () {
        disableMenu(true);
        for (let i = 0; i < arr.length; i++) {
            let min = i;
            for (let j = i + 1; j < arr.length; j++) {
                colorize(min, j);
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
            compare_pos();
        }
        ;
        disableMenu(false);
    });
}
;
//---------------- Quick Sort -----------------------
function quickSort(arr, left, right) {
    return __awaiter(this, void 0, void 0, function* () {
        if (arr.length <= 1) {
            return arr;
        }
        ;
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
            colorize(i, j);
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
// ======================================================
// functions responsible for disabling navigation buttons
const disableMenu = (isSorted) => {
    if (isSorted) {
        btnBubbleSort.disabled = true;
        btnBubbleSort.classList.add("disabled");
        btnInsertSort.disabled = true;
        btnInsertSort.classList.add("disabled");
        btnSelectionSort.disabled = true;
        btnSelectionSort.classList.add("disabled");
        arrSizeInput.disabled = true;
        arrSizeInput.classList.add("disabled");
    }
    else {
        btnBubbleSort.disabled = false;
        btnBubbleSort.classList.remove("disabled");
        btnInsertSort.disabled = false;
        btnInsertSort.classList.remove("disabled");
        btnSelectionSort.disabled = false;
        btnSelectionSort.classList.remove("disabled");
        arrSizeInput.disabled = false;
        arrSizeInput.classList.remove("disabled");
    }
    ;
};
generateArray(150);
btnBubbleSort.addEventListener("click", () => {
    bubbleSort(arr);
});
btnInsertSort.addEventListener("click", () => {
    insertionSort(arr);
});
btnSelectionSort.addEventListener("click", () => {
    selectionSort(arr);
});
btnQuickSort.addEventListener("click", () => {
    console.log(quickSort(arr, 0, arr.length - 1));
});
arrSizeInput.addEventListener("change", (event) => {
    generateArray(parseInt(event.target.value));
});
arrSortSpeedInput.addEventListener("change", (event) => {
    sortSpeed = parseInt(event.target.value);
});
