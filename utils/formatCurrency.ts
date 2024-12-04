
export const formatCurrency = (value: any) => {
  if(value)
    return '$'+ parseFloat(value).toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  export const total=(productos :any , paid = 0)=>{
    var total = 0;
    if(productos)
      for (const prod of productos) {
        total += prod.totalproducto * prod.cantidad;
      }      
      if(paid){
        total = total -paid;
      }
      return formatCurrency(total);
  };