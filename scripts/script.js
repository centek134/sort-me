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
const arr = Array(100).fill(0, 0).map(() => Math.floor(Math.random() * 300));
const sorted_arr_copy = JSON.parse(JSON.stringify(arr));
sorted_arr_copy.sort((a, b) => a - b);
const createGraphItems = (arr) => {
    arr.forEach(item => {
        const el = document.createElement("div");
        el.style.height = `${item.toString()}px`;
        el.classList.add("item");
        graphId.append(el);
    });
};
const removeGraphItems = () => {
    graphId.innerHTML = "";
};
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
const colorize = (num_1, num_2) => {
    const nodes = document.querySelectorAll(".item");
    nodes.forEach(el => {
        el.classList.remove("compare");
    });
    nodes[num_1].classList.add("compare");
    nodes[num_2].classList.add("compare");
};
function bubbleSort(inputArr) {
    return __awaiter(this, void 0, void 0, function* () {
        let len = inputArr.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - 1; j++) {
                colorize(j, j + 1);
                yield sleep(5);
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
        return inputArr;
    });
}
;
const compare_pos = () => {
    const nodes = document.querySelectorAll(".item");
    for (let i = 0; i < sorted_arr_copy.length; i++) {
        if (sorted_arr_copy[i] === arr[i]) {
            nodes[i].style.backgroundColor = "yellow";
        }
        ;
    }
    ;
};
createGraphItems(arr);
const buttonId = document.getElementById("btn").addEventListener("click", () => {
    bubbleSort(arr);
});
