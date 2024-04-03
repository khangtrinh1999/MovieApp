export function convertDate(dateString){
    if (dateString){
        var p = dateString?.split(/\D/g)
        return [p[2],p[1],p[0] ].join("/")
    }
        return ""
    }

    export function getYear(dateString){
        if (dateString){
            var p = dateString?.split(/\D/g)
            return p[0]
        }
            return ""
        }
    


export function getPercentage (number){
    if (number) return (Number(number)/10)
    else return 0
     
}
export function getRatingColor (number){
    const buff = Number(number)
    if (buff <=4) return 'rgba(250,0,0,1)'
    if (buff > 4 && buff < 7) return 'rgba(250,250,0,1)'
    else return 'rgba(0,250,0,1)'
        
}
export function  getEmptyRatingColor (number){
    const buff = Number(number)
    if (buff <=4) return 'rgba(250,0,0,0.3)'
    if (buff > 4 && buff < 7) return 'rgba(250,250,0,0.3)'
    else return 'rgba(0,250,0,0.3)'
        
}


export function comparePopularity( a, b ) {
    if ( a.popularity < b.popularity ){
      return 1;
    }
    if ( a.popularity > b.popularity ){
      return -1;
    }
    return 0;
  }