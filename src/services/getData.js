class GetData{
    _apiUrl='https://gateway.marvel.com:443/v1/public/'
    _apiKey='apikey=620de84168d1c894797da5075b563716'
    _baseOffset=250
    requests= async (url)=>{
        const data= await fetch(url);
       
        if(!data.ok){
            throw new Error(`Could not fetch ${url}`);
        }
        return await data.json();
    }
    getAllCharacters=async(offset = this._baseOffset)=>{
       const res= await this.requests(`${this._apiUrl}characters?offset=${offset}&${this._apiKey}`);
       return res.data.results.map(this._transformate);
    }
    getCharacter= async(id)=>{
        let res= await this.requests(`${this._apiUrl}characters/${id}?${this._apiKey}`);
        return this._transformate(res.data.results[0]);
     }
     getIdCharacters= async()=>{
        let request=await this.getAllCharacters();
        let arrId=[];
        arrId= request.data.results.map(item=>item.id);
        return arrId;
     }
     _transformate=(data)=>{
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

}
export default GetData;