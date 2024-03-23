import './secondLoader.css'
import Square from '../squareComponent/Square'
import MyLoading from '../loading/MyLoading'
const SecondLoader = ({count}) => {
    const arrayLoader = [1,2,3,4,5,6,7,8,9,10]
  return (
    <div className="secondLoader_container">
        {arrayLoader.splice(0,count).map((idx)=>{
            return <Square key = {idx}><MyLoading/></Square>
        })}
    </div>
  )
}

export default SecondLoader