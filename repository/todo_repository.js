const { Sequelize } = require("sequelize/types");

class TodoItem extends Sequelize.Model {}

const initSequelize = (config) => {
  const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
      host: config.server,
      dialect: "postgres",
      define: {
        freezeTableName: true,
        timestamps: false,
      },
    },
  );
  // adding the full model deifinition
  TodoItem.init(
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isComplete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Item",
    },
  );

  const repository = (config) => {
    let sequelize = initSequelize(config);

    const disconnect = () => sequelize.close();

    const createToDoItem = (title, description) => {
      return TodoItem.create({
        title: title,
        description: description,
        isComplete: false,
      });
    };

    const markAsComplete = (id) => {
      return TodoItem.update(
        {
          isComplete: true,
        },
        {
          where: {
            id: id,
          },
        },
      );
    };

    const getAllIncompleteToDoItems = () => {
      return TodoItem.findAll({
        where: {
          isComplete: false,
        },
      });
    };
    return Object.create({
      disconnect,
      createToDoItem,
      getAllIncompleteToDoItems,
      markAsComplete,
    });
  };
};
