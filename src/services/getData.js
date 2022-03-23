import {useHttp} from '../components/hooks/useHttpHook';
const useGetData= ()=>{
    const _apiUrl='https://gateway.marvel.com:443/v1/public/'
    const _apiKey='apikey=620de84168d1c894797da5075b563716'
    const _baseOffset=250;
    const _baseOffsetForComics=1;
    const {loading,error,request,clearError}=useHttp();

    const getAllCharacters=async(offset = _baseOffset)=>{
       const res= await request(`${_apiUrl}characters?offset=${offset}&${_apiKey}`);
       return res.data.results.map(_transformate);
    }

    const getCharacterByName = async(data) => {

        const name = `name=${data}`;

        let res = await request(`${_apiUrl}characters?${name}&${_apiKey}`)

        return res.data.results.map(_transformate);

    }

    const getCharacter= async(id)=>{
        let res= await request(`${_apiUrl}characters/${id}?${_apiKey}`);
        return _transformate(res.data.results[0]);
     }

     const getIdCharacters= async()=>{
        let request=await getAllCharacters();
        let arrId=[];
        arrId= request.data.results.map(item=>item.id);
        return arrId;
     }

     const getComics=async(offset=_baseOffsetForComics)=>{
         let Data= await request(`${_apiUrl}comics?offset=${offset}&${_apiKey}`);
         return await Data.data.results.splice(12,11);
     }

     const getSomeComics=async(id)=>{
        let Data= await request(`${_apiUrl}comics/${id}?${_apiKey}`);
        Data=await Data.data.results[0];
        return await({
            title:Data.title,
            text:(Data.textObjects[0])?Data.textObjects[0].text:null,
            numberOfIssue:Data.pageCount,
            language:(Data.textObjects[0])?Data.textObjects[0].language:null,
            price:Data.prices[0].price,
            image:Data.thumbnail.path+'.'+Data.thumbnail.extension
        })
    }

     const _transformate=(data)=>{
         return({
             comics:data.comics.items,
             id:data.id,
             name:data.name,
             text:(data.description.length!==0)?
                    (data.description.length>250)?
                    data.description.substr(0,250)+'...'
                    :data.description
                :'Not found'
             ,
             homepage:data.urls[0].url,
             wiki:data.urls[1].url,
             picture:data.thumbnail.path+'.'+data.thumbnail.extension
         })
     }

     return {loading, error, getAllCharacters, getCharacter, getIdCharacters, getComics, getSomeComics, clearError, getCharacterByName};

}

export default useGetData;