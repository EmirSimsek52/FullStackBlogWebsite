export const animateY = (delay) => {
    return {
      y: [-500,0],
      opacity: [0,1],
      duration: 0.5,

      
    };
  };
  
  export const animateX= () => {
    return {
      x: [-100,0],
   
      opacity: [0,.5,1],
      transition:
      {
        duration: .5
      }
    }
  }
    
  export const animateX2= () => {
    return {
      x: [100,0],
  
      opacity: [0,.5,1],
      transition:
      {
        duration: .5
      }
    }
  }
