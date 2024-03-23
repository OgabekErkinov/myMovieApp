import { useEffect, useState } from "react"

export const useDebounce = (value, delay = 3000) => { 
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(()=>{
        const time = setTimeout(()=>setDebounceValue(value),delay)

        return ()=> clearInterval(time)
    },[value,delay])

    return {debounceValue}

}