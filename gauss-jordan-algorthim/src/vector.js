class Vector extends Matrix{
    constructor(dim, values){
        super(dim, 1, values)
    }

    get(i){
       return super.get(i, 1) 
    }

    set(i, value){
        return super.set(i, 1, value)
    }
}