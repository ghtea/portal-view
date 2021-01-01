
const calculateHp = (listBooleanVisited: boolean[]) => {

    const length = listBooleanVisited.length;

    let hpMax:number = 0;
    for (var i = 0; i < length; i++){
        const numberToAdd = (length-i);
        hpMax += numberToAdd;
    }
    
    let hpCurrent:number = 0;
    for (var i = 0; i < length; i++){
        if (listBooleanVisited[i] === true){
            const numberToAdd = (length-i);
            hpCurrent += numberToAdd;
        }
    }
    const ratioHp = Math.round((hpCurrent / hpMax) * 100) / 100;
    
    let kindHp = 'healthy';
    if (ratioHp < 0.2){
        kindHp = 'critical'
    }
    else if (ratioHp < 0.4){
        kindHp = 'warning'
    }
    return {hpCurrent, hpMax, ratioHp, kindHp}
}

export default calculateHp;