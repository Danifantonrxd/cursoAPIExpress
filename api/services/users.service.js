const { faker } = require("@faker-js/faker");

class UsersServices {

  constructor(){
    this.users = [];
    this.generate();
  }

  generate(size = 10){
    const limit = size;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        user_id: faker.string.uuid(),
        name: faker.person.fullName(),
        gender: faker.person.sex()
      })
    }
  }

  async create({ name, gender }) {
    const user = {
      id: faker.datatype.uuid(),
      name,
      gender
    };
    this.users.push(user);
    return user;
  }

  async find() {
    return this.users;
  }

  async findOne(id) {
    return this.users.find(item => item.user_id === id);
  }

  async update(id, changes) {
    const index = this.users.find(item => item.user_id === id);
    if(index === -1){
      throw new Error("User not found");
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    }

    return this.users[index]
  }

  async delete(id) {
    const index = this.users.find(item => item.user_id === id);
    if (index === -1) {
      throw new Error("User not found");
    }

    this.users.splice(index, 1);
    return { id };
  }

}

module.exports = UsersServices;
