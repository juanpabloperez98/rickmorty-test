'use strict';

const fetch = require("node-fetch");

module.exports = {
  async up(queryInterface, Sequelize) {
    const res = await fetch("https://rickandmortyapi.com/api/character/?page=1");
    const data = await res.json();

    const characters = data.results.slice(0, 15).map(c => ({
      name: c.name,
      status: c.status,
      species: c.species,
      gender: c.gender,
      origin: c.origin.name,
      image: c.image,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert("characters", characters);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("characters", null, {});
  }
};
