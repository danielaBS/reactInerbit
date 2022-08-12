
let users = {
    admin: {"nombre": "Usuario de Prueba", "username": "admin", "password": "admin"},    
}

const getUsers = () =>
  new Promise((resolve, reject) => {
    if (!users) {
      return setTimeout(
        () => reject(new Error('Usuarios no encontrados')),
        250
      );
    }
 
    setTimeout(() => resolve(Object.values(users)), 250);
  });

  const getUser = (data) =>
  new Promise((resolve, reject) => {
    const username= data.username;
    const user = users[username];
 
    if (!user) {
      return setTimeout(
        () => resolve('error'),
        250
      );
    }

    setTimeout(() => resolve(user), 250);
    
  });
 
  const createUser = (data) =>
  new Promise((resolve, reject) => {
    if (!data.username || !data.password) {
      reject(new Error('La información no es valida'));
    }
 
    const newUser = { ...data };
 
    users = { ...users, newUser };
 
    setTimeout(() => resolve(true), 250);
  }); 

  const deleteUser = (numDocument) =>
  new Promise((resolve, reject) => {
    const { [numDocument]: user, ...rest } = users;
 
    if (!user) {
      return setTimeout(
        () => reject(new Error('Usuario no encontrado')),
        250
      );
    }
 
    users = { ...rest };
 
    return setTimeout(() => resolve(true), 250);
  });


  export {getUser, getUsers, deleteUser, createUser}