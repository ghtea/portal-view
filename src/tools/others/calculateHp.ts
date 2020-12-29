
const calculateHp = (listBooleanVisited: boolean[]) => {

    let hpMax:number = 0;
    for (var i = 0; i < listBooleanVisited.length; i++){
        const numberToAdd = (30-i);
        hpMax += numberToAdd;
    }
    
    let hpCurrent:number = 0;
    for (var i = 0; i < listBooleanVisited.length; i++){
        if (listBooleanVisited[i] === true){
            const numberToAdd = (30-i);
            hpCurrent += numberToAdd;
        }
    }
    const ratioHp = Math.round((hpCurrent / hpMax) * 100) / 100;
    
    return {hpCurrent, hpMax, ratioHp}
}

export default calculateHp;