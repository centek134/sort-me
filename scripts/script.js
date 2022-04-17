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
const arr = Array(50).fill(0, 0).map(() => Math.floor(Math.random() * 300));
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
        el.classList.remove("first");
        el.classList.remove("second");
    });
    console.log(num_2);
    nodes[num_1].classList.add("first");
    nodes[num_2].classList.add("second");
};
function bubbleSort(inputArr) {
    return __awaiter(this, void 0, void 0, function* () {
        let len = inputArr.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - 1; j++) {
                colorize(j, j + 1);
                yield sleep(400);
                if (inputArr[j] < inputArr[j + 1]) {
                    let tmp = inputArr[j];
                    inputArr[j] = inputArr[j + 1];
                    inputArr[j + 1] = tmp;
                    removeGraphItems();
                    createGraphItems(inputArr);
                }
            }
        }
        return inputArr;
    });
}
;
createGraphItems(arr);
const buttonId = document.getElementById("btn").addEventListener("click", () => {
    bubbleSort(arr);
});
