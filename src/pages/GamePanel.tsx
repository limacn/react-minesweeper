import styled from "styled-components"
import MineBox from "../components/MineBox"
import { useState } from "react";
type MyProps = {
    size: number;
}
const MINE_BOX_SIZE: number = 60;
// let isWin:boolean=false;
export default function GamePanel(props: MyProps) {
    const [steps, setSteps] = useState(0);
    const [array, setArray] = useState(createArray(props.size * props.size));
    const [isWin, setIsWin] = useState(false);
    function createArray(size: number) {
        let result = [];
        for (let i = 0; i < size; i++) {
            result.push({
                index: i,
                clicked: false,
                value: ""
            });
        }
        return result;
    }
    function onMineClicked(index: number) {
        if (isWin) return;
        // console.log(array[index]);
        let tempArray = array.slice();
        tempArray[index].clicked = true;
        tempArray[index].value = steps % 2 === 0 ? "O" : "X";
        setArray(tempArray);
        setSteps(steps + 1)
        checkWin(index);
    }
    function judge(index: number, xOffset: number, yOffset: number) {
        const nodeY = Math.floor(index / props.size);
        const nodeX = index % props.size;
        let counter = 0;
        for (let i = 0; i < 5; i++) {
            const tempX=nodeX+xOffset*i;
            const tempY=nodeY+yOffset*i;
            if(tempX>=props.size || tempY>=props.size){
                break;
            }
            const currentIndex = tempX + tempY * props.size;            
            if (currentIndex < 0 || currentIndex >= array.length) {
                break;
            }
            if (array[currentIndex].value !== array[index].value) {
                // console.log(currentIndex,array[currentIndex].value,array[index].value)
                break;
            }
            ++counter;
        }
        for (let i = 0; i < 5; i++) {
            const tempX=nodeX-xOffset*i;
            const temeY=nodeY-yOffset*i;
            if(tempX<0 || temeY<0){
                break;
            }
            const currentIndex = tempX + temeY * props.size;
            if (currentIndex < 0 || currentIndex >= array.length){
                break;
            }
            if (array[currentIndex].value !== array[index].value){

                // console.log(currentIndex,array[currentIndex].value,array[index].value)
                break;
            }
            ++counter;
        }
        // console.log(counter,xOffset,yOffset);
        //因为上面2个循环中i=0时++counter都执行了，最终结果需要减掉一次重复机算
        return (counter-1) >= 5;
    }
    function checkWin(index: number) {
        if (judge(index, 0, 1) || judge(index, 1, 0) || judge(index, 1, 1) || judge(index, -1, 1)) {
            // console.log(array[index].value + " win");
            window.alert(array[index].value + " win");
            setIsWin(true);
        }
        else {
            console.log("continue");
        }
    }
    // const array=new Array(props.size * props.size);

    return (
        <>
            <RootBox>
                <MinesContainer style={{ width: MINE_BOX_SIZE * props.size, height: MINE_BOX_SIZE * props.size }}>
                    {array.map((item, index) => {
                        return (
                            <MineBox key={index}
                                onClicked={onMineClicked}
                                clicked={array[index].clicked}
                                value={array[index].value}
                                index={index}
                                x={(index) % props.size * MINE_BOX_SIZE}
                                y={Math.floor((index) / props.size) * MINE_BOX_SIZE}
                                lineSize={MINE_BOX_SIZE}>
                                {item}
                            </MineBox>
                        )
                    })}
                </MinesContainer>
            </RootBox>
            <div key="infos">{steps}</div>
        </>
    )
}
const RootBox = styled.div`
  width:100%;
  flex:1;
  flex-wrap:wrap;
  display:flex;
  flex-direction:row;
  justify-content: center; 
  column-gap:10px; 
  `
const MinesContainer = styled.div`
    position:relative;
`