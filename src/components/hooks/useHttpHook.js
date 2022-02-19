import { useState, useCallback } from "react"
export const useHttp=()=>{
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const request=useCallback(async(url)=>{
        setLoading(true);
        try{
            const data = await fetch(url);
            if(!data.ok){
                throw new Error(`Could not fetch ${url}`);
            }
            setLoading(false);
            return data.json();
        }
        catch(e){
            setError(e.message);
            setLoading(false);
            throw e;
        }
    },[])
    const clearError=useCallback(()=>setError(null),[]);
    return {loading,error,request,clearError}
}