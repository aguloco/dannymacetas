module.exports = (sequelize, Datatypes) => {
 
    let alias = 'Detalle_venta'; 
    
    let cols = {
      id: {type: Datatypes.INTEGER(11), primaryKey: true, autoIncrement: true, allowNull: false},
      fecha: {type: Datatypes.DATE(6), allowNull: false},
      monto_total: {type: Datatypes.DECIMAL(10,0), allowNull: false}
    }
    
    let config = {camelCase: false, timestamps: false};
    
    const Detalle_venta = sequelize.define(alias,cols,config)
    
    Detalle_venta.associate = function(models){

        Detalle_venta.hasMany(models.Venta, {
           as: "Venta",
           foreignKey: "Detalle_venta_id"
            });
   }
   return Detalle_venta;
}
