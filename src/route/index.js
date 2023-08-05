// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

//отримання даних з сервера та робота з ними

// class User {
//   static #list = []

//   constructor(email, login, password) {
//     this.email = email
//     this.login = login
//     this.password = password
//     this.id = new Date().getTime()
//   }

//   verifyPassword = (password) => this.password === password

//   static add = (user) => {
//     this.#list.push(user)
//   }

//   static getList = () => this.#list

//   static getById = (id) =>
//     this.#list.find((user) => user.id === id)

//   static deleteById = (id) => {
//     const index = this.#list.findIndex(
//       (user) => user.id === id,
//     )
//     if (index !== -1) {
//       this.#list.splice(index, 1)
//       return true
//     } else {
//       return false
//     }
//   }

//   static updateByID = (id, data) => {
//     const user = this.getById(id)
//     if (user) {
//       this.update(user, data)
//       return true
//     } else {
//       return false
//     }
//   }

//   static update = (user, { email }) => {
//     if (email) {
//       user.email = email
//     }
//   }
// }

class Product {
  constructor(name, price, description) {
    this.id = Math.trunc(Math.random() * 99998 + 1)
    this.createDate = new Date().toISOString()
    this.name = name
    this.price = price
    this.description = description
  }

  static #list = []

  static getList = () => this.#list
  // static getName = () => this.name

  static add = (product) => this.#list.push(product)

  static getById = (id) =>
    this.#list.find((product) => product.id === id)

  static update = (
    product,
    { name, price, description },
  ) => {
    if (name) {
      product.name = name
    }
    if (price) {
      product.price = price
    }
    if (description) {
      product.description = description
    }
  }

  static updateByID = (id, data) => {
    const product = this.getById(id)
    if (product) {
      this.update(product, data)
      return true
    } else {
      return false
    }
  }

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )
    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }
}

//=======================================

// router.get Створює нам один ентпоінт

// ↙️ тут вводимо шлях (PATH) до сторінки
// router.get('/', function (req, res) {
//   // res.render генерує нам HTML сторінку

//   const list = User.getList()

//   // ↙️ cюди вводимо назву файлу з сontainer
//   res.render('index', {
//     // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//     style: 'index',

//     data: {
//       users: {
//         list,
//         isEmpty: list.length === 0,
//       },
//     },
//   })
//   // ↑↑ сюди вводимо JSON дані
// })

// ================================================================

// router.post('/user-create', function (req, res) {
//   // res.render генерує нам HTML сторінку
//   const { email, login, password } = req.body
//   const user = new User(email, login, password)
//   User.add(user)
//   console.log(User.getList())

//   // ↙️ cюди вводимо назву файлу з сontainer
//   res.render('success-info', {
//     // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//     style: 'success-info',
//     info: 'Користувача створено',
//   })
//   // ↑↑ сюди вводимо JSON дані
// })

//====================================

// router.get('/user-delete', function (req, res) {
//   // res.render генерує нам HTML сторінку
//   const { id } = req.query
//   User.deleteById(Number(id))

//   // ↙️ cюди вводимо назву файлу з сontainer
//   res.render('success-info', {
//     // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//     style: 'success-info',
//     info: 'Користувача видалено',
//   })
//   // ↑↑ сюди вводимо JSON дані
// })

//====================================

// router.post('/user-update', function (req, res) {
//   // res.render генерує нам HTML сторінку
//   const { email, password, id } = req.body

//   let result = false

//   const user = User.getById(Number(id))

//   if (user.verifyPassword(password)) {
//     User.update(user, { email })
//     result = true
//   }

//   // ↙️ cюди вводимо назву файлу з сontainer
//   res.render('success-info', {
//     // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//     style: 'success-info',
//     info: result
//       ? 'Пошту (email) користувача оновлено'
//       : 'Сталася помилка',
//   })
//   // ↑↑ сюди вводимо JSON дані
// })

// ================================================================

router.get('/', function (req, res) {
  // const list = Product.getList()

  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-create', {
    title: 'Products',
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-create',

    // data: {
    //   products: {
    //     list,
    //     isEmpty: list.length === 0,
    //   },
    // },
  })
  // ↑↑ сюди вводимо JSON дані
})

//=================================================================

router.post('/product-create', function (req, res) {
  // res.render генерує нам HTML сторінку
  const { name, price, description } = req.body
  const product = new Product(name, price, description)
  let result = false
  Product.add(product)
  // console.log(product)
  if (Product.getList().includes(product)) {
    // let indx = Product.getList().indexOf(product)
    // console.log(Product.getList().at(indx))
    result = true
  }
  // console.log(Product.getList())

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',
    info: result
      ? 'Успішне виконання дії'
      : 'Виникла помилка',
    description: result
      ? 'Товар успішно додано'
      : 'Товар не було додано',
    // info: 'Успішне виконання дії.',
    // description: 'Товар успішно був доданий.',
  })
  // ↑↑ сюди вводимо JSON дані
})

//=================================================================

router.get('/product-list', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-list',

    prdts: Product.getList(),
    isEmpty: Product.getList().length === 0,
  })
  // ↑↑ сюди вводимо JSON дані
})

//=================================================================

router.get('/product-edit', function (req, res) {
  // res.render генерує нам HTML сторінку

  const { id } = req.query
  let result = false
  const prod = Product.getById(Number(id))
  if (Product.getById(Number(id)) !== undefined) {
    result = true
  }
  // console.log(result)

  // ↙️ cюди вводимо назву файлу з сontainer

  res.render('product-edit', {
    style: 'product-edit',
    product: prod,
    isSearch: result
      ? 'Інформація про товар'
      : 'Інформація про товар - Товар з таким ID не знайдено',
  })

  // res.render('alert_to_edit', {
  //   style: 'alert_to_edit',
  //   product: prod,
  //   info: result ? 'Пошук виконано' : 'Пошук виконано',
  //   description: result
  //     ? 'Товар знайдено'
  //     : 'Товар з таким ID не знайдено',
  //   id: id,
  // })

  //↑↑ сюди вводимо JSON дані
})

//=================================================================

router.post('/product-edit', function (req, res) {
  // res.render генерує нам HTML сторінку

  const { name, price, description, id } = req.body
  // console.log(id)
  let result = false

  Product.updateByID(Number(id), {
    name,
    price,
    description,
  })

  if (
    Product.updateByID(Number(id), {
      name,
      price,
      description,
    })
  ) {
    result = true
  }

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',
    info: result
      ? 'Успішне виконання дії'
      : 'Виникла помилка',
    description: result
      ? 'Дані про товар оновлено'
      : 'Аані вро товар не оновлено',
  })
  // ↑↑ сюди вводимо JSON дані
})

router.get('/product-delete', function (req, res) {
  // res.render генерує нам HTML сторінку

  const { id } = req.query
  // let result = false
  result = Product.deleteById(Number(id))
  // if (Product.deleteById(Number(id))) {
  //   result = true
  // }
  // console.log(result)

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',
    info: result
      ? 'Успішне виконання дії'
      : 'Виникла помилка',
    description: result
      ? 'Товар видалено'
      : 'Товар не видалено',
  })
  // ↑↑ сюди вводимо JSON дані
})

// Підключаємо роутер до бек-енду
module.exports = router
