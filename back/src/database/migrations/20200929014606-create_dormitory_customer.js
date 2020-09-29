module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('dormitorios_cliente', {
      id_dormitorio: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      id_cliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      }
    }).then(() => queryInterface.addConstraint('dormitorios_cliente', ['id_dormitorio'], {
      type: 'FOREIGN KEY',
      name: 'FK_DormitoriosClienteIdDormitorio_dormitorios',
      references: {
        table: 'dormitorios',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    }))
    .then(() => queryInterface.addConstraint('dormitorios_cliente', ['id_cliente'], {
      type: 'FOREIGN KEY',
      name: 'FK_DormitoriosClienteIdCliente_Clientes',
      references: {
        table: 'clientes',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    }))
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('dormitorios_cliente');
  }
};





