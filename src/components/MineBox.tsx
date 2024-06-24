import styled from "styled-components";
type MyProps = {
    x:number;
    y:number;
    lineSize:number;
    index: number;
    clicked:boolean;
    value: string;
    children:any;
    onClicked:(index:number)=>void;
};
export default function MineBox(props: MyProps) {
    return (
        props.clicked
        ?<RootBox xy={props.lineSize} style={{'left':props.x,'top':props.y}}>{props.value}</RootBox>
        :<RootBox xy={props.lineSize} onClick={()=>{props.onClicked(props.index)}} style={{'left':props.x,'top':props.y}}></RootBox>
    );
}
type RootBoxProps={xy?:number}
const RootBox = styled.div<RootBoxProps>`
  width:${props=>props.xy?props.xy:80}px;
  height:${props=>props.xy?props.xy:80}px;
  border:1px #ff0 solid;
  display:flex;
  align-items: center;
  justify-content: center; 
  flex:0 0 80px;
  position:absolute;
  cursor:pointer;
`