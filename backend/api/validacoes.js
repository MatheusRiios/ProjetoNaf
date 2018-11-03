module.exports = app => {
    
    function existeOrError(value, msgErr){
        if(!value) 
            throw msgErr
    
        if(Array.isArray(value)  && value.length === 0) 
            throw msgErr
    
        if(typeof value === 'string' && !value.trim()) 
            throw msgErr
    }
    
    function naoExistOrError(value, msgErr){
        try{
            existeOrError(value, msgErr)
        }catch (msgErr){
            return 
        }
        throw msgErr
    }
    
    function valoresIguais(valueA, valueB, msgErr){
        if(valueA !== valueB) 
            throw msgErr
    }
    
    return { existeOrError, naoExistOrError, valoresIguais }    
}