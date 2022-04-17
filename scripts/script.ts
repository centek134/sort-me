const graphId = document.getElementById("graph");


const arr:number[] = Array(50).fill(0,0).map( () => Math.floor(Math.random() * 300));


const createGraphItems = (arr:number[]) => {
    arr.forEach( item => {
       const el =  document.createElement("div") as HTMLElement;
        el.style.height = `${item.toString()}px`;
        el.classList.add("item");
        graphId!.append(el);
    });
};

const removeGraphItems = () => {
    graphId!.innerHTML = "";
};

const sleep = (ms:number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const colorize = (num_1:number,num_2:number) => {
    const nodes: NodeListOf<HTMLDivElement> = document.querySelectorAll(".item");
    nodes.forEach(el => {
        el.classList.remove("first");
        el.classList.remove("second");
    });
    console.log(num_2)
    nodes[num_1].classList.add("first");
    nodes[num_2].classList.add("second");
}
async function bubbleSort(inputArr:number[]){
    let len = inputArr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len -1 ; j++) {
            colorize(j,j+1)
            await sleep(400);
            if (inputArr[j] < inputArr[j+1]){
                let tmp = inputArr[j];
                inputArr[j] = inputArr[j+1];
                inputArr[j+1] = tmp;
                removeGraphItems();
                createGraphItems(inputArr);
            }       
        }
    }
    return inputArr;
};


createGraphItems(arr);

const buttonId = document.getElementById("btn")!.addEventListener("click",() => {
    bubbleSort(arr);
})