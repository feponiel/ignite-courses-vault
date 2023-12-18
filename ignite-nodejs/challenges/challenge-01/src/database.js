import fs from 'node:fs/promises'

const databaseFilePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databaseFilePath, 'utf-8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  insert(table, data) {
    if (this.#database[table]) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  select(table, search) {
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }

    return data
  }

  update(table, id, updatedData) {
    const dataIndex = this.#database[table].findIndex(row => row.id === id)

    if (dataIndex < 0) {
      throw new Error(
        `The resource with id ${id} couldn't be found in the ${table} table.`
      )
    }

    this.#database[table][dataIndex] = {
      ...this.#database[table][dataIndex],
      ...updatedData
    }

    this.#persist()
  }

  delete(table, id) {
    const dataIndex = this.#database[table].findIndex(row => row.id === id)

    if (dataIndex < 0) {
      throw new Error(
        `The resource with id ${id} couldn't be found in the ${table} table.`
      )
    }

    this.#database[table].splice(dataIndex, 1)
    this.#persist()
  }

  #persist() {
    fs.writeFile('db.json', JSON.stringify(this.#database))
  }
}
