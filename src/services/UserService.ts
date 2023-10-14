let db: any = [{ id: 1, name: "Samuel", email: "samuel@gmail.com" }];

export interface IUser {
  id: number;
  name: string;
  email: string;
}

export class UserService {
  db: IUser[];

  constructor(database = db) {
    this.db = database;
  }

  createUser = (id: number, name: string, email: string) => {
    const user = {
      id,
      name,
      email,
    };
    this.db.push(user);
    console.log("DB atualizado", this.db);
  };

  getUsers = () => {
    return this.db;
  };

  deleteUser = (id: number) => {
    function removerPorId(db: any, id: number) {
      return db.filter(function (el: any) {
        return el.id !== id;
      });
    }
    
    this.db = removerPorId(this.db, id);
  };
}
