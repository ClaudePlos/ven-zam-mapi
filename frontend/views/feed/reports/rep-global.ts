
export class RepGlobal {

   public convertPLtoUStxt( value : string ) {
        return value.replace(/ą/gi,"a")
            .replace(/ć/gi,"c")
            .replace(/ę/gi,"e")
            .replace(/ł/gi,"l")
            .replace(/ń/gi,"n")
            .replace(/ó/gi,"o")
            .replace(/ś/gi,"s")
            .replace(/ź/gi,"z")
            .replace(/ż/gi,"z")
            .replace(/Ą/gi,"A")
            .replace(/Ć/gi,"C")
            .replace(/Ę/gi,"E")
            .replace(/Ł/gi,"L")
            .replace(/Ń/gi,"N")
            .replace(/Ó/gi,"O")
            .replace(/Ś/gi,"S")
            .replace(/Ź/gi,"Z")
            .replace(/Ż/gi,"Z")

    }

}

export const repGlobal = new RepGlobal();