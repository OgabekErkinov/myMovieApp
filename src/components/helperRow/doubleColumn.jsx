import './doubleColumn.css'
const DoubleColumn = ({contentOne, contentTwo}) => {
    const safeContentOne = isNaN(contentOne) ? String(contentOne) : contentOne;
    const safeContentTwo = isNaN(contentTwo) ? String(contentTwo) : contentTwo;
  return (
    <div className="helperRow">
        <div className="firstColumn">{safeContentOne}</div>
        <div className="secondColumn">{safeContentTwo}</div>
    </div>
  )
}

export default DoubleColumn