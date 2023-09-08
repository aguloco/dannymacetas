module.exports = function LocalData(sequelize, Datatypes){
 
    let alias = 'Local'; 
    
    let cols = {
      id: {type: Datatypes.INTEGER(11), primaryKey: true, autoIncrement: true, allowNull: false},
      nombre: {type: Datatypes.STRING(45), allowNull: false},
    }
    
    let config = {camelCase: false, timestamps: false};
    
    const Local = sequelize.define(alias,cols,config)
    
    Local.associate = function (models){

        Local.hasMany(models.Usuario, {
           as: "usuario",
           foreignKey: "Local_id"
            });
   }
   return Local;
}
