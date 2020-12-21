const dateLast = objPortal.dateVisitedLast || objPortal.created;
      const timeBetween = date - dateLast;
      console.log(timeBetween);
      
      
      let listBooleanVisited = objPortal.listBooleanVisited;
      let listToAdd = [];
      
      const hoursBetween = timeBetween / (1000 * 60 * 60 );
      console.log(hoursBetween);
      if (hoursBetween > 23) {
        listToAdd.push(true);
        
        let hoursBetweenRemaining = hoursBetween - 24;
        
        for (var i = 0; i < objPortal.lifespan; i++ ) {
          if (hoursBetweenRemaining > 23){
            //console.log('one loop')
            
            //console.log(hoursBetweenRemaining)
            hoursBetweenRemaining -= 24;
            //console.log(hoursBetweenRemaining)
            
            listToAdd.push(false);
          }
        }
        
        listBooleanVisited = listToAdd.concat(listBooleanVisited);
        
        for (var i = 0; i < objPortal.lifespan; i++ ) {
          if (listBooleanVisited.length > objPortal.lifespan){
            listBooleanVisited.pop();
          }
        }
      
        
      } 
      
  
      let update = {
  
        listBooleanVisited: listBooleanVisited,
        dateVisitedLast: date
      };