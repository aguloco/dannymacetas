module.exports = (sequelize, Datatypes) => {
 
  let alias = 'Categoria'; 
  
  let cols = {
    id: {type: Datatypes.INTEGER(11), primaryKey: true, autoIncrement: true, allowNull: false},
    nombre: {type: Datatypes.STRING(45), allowNull: false}
  }
  
  let config = {camelCase: false, timestamps: false};
  
  const Categoria = sequelize.define(alias,cols,config)

  Categoria.associate = function (models){

    Categoria.hasMany(models.Producto, {
      as: "Producto",
      foreignKey: "Categoria_id"
    });
  }


  return Categoria;
}