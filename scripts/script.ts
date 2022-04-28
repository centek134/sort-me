const graphId = document.getElementById("graph");


const arr:number[] = Array(100).fill(0,0).map( () => Math.floor(Math.random() * 300));
const sorted_arr_copy:number[] = JSON.parse(JSON.stringify(arr));
sorted_arr_copy.sort((a,b)=> a-b);

const createGraphItems = (arr:number[]):void => {
    arr.forEach( item => {
       const el =  document.createElement("div") as HTMLElement;
        el.style.height = `${item.toString()}px`;
        el.classList.add("item");
        graphId!.append(el);
    });
};

const removeGraphItems = ():void => {
    graphId!.innerHTML = "";
};

const sleep = (ms:number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const colorize = (num_1:number,num_2:number):void => {
    const nodes: NodeListOf<HTMLDivElement> = document.querySelectorAll(".item");
    nodes.forEach(el => {
        el.classList.remove("compare");
    });
    nodes[num_1].classList.add("compare");
    nodes[num_2].classList.add("compare");
};
async function bubbleSort(inputArr:number[]){
    let len: number = inputArr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len -1 ; j++) {
            colorize(j,j+1)
            await sleep(5);
            if (inputArr[j] > inputArr[j+1]){
                let tmp = inputArr[j];
                inputArr[j] = inputArr[j+1];
                inputArr[j+1] = tmp;
                removeGraphItems();
                createGraphItems(inputArr);
            };
            compare_pos();
        };
    };
    return inputArr;
};

const compare_pos = () => {
    const nodes: NodeListOf<HTMLDivElement> = document.querySelectorAll(".item");
    for(let i = 0; i < sorted_arr_copy.length; i++){
        if(sorted_arr_copy[i] === arr[i]){
            nodes[i].style.backgroundColor = "yellow";
        };
    };
};

createGraphItems(arr);
const buttonId = document.getElementById("btn")!.addEventListener("click",() => {
    bubbleSort(arr);
})