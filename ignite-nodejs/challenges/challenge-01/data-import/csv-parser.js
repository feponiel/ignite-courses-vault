import fs from 'node:fs'
import { parse } from 'csv-parse'

const tasksFilePath = new URL('./tasks.csv', import.meta.url)

const csvStream = fs.createReadStream(tasksFilePath)

const parserStream = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2
})

async function start() {
  const parsedLines = csvStream.pipe(parserStream)

  for await (const line of parsedLines) {
    const [title, description] = line

    fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description
      })
    })
  }
}

start()
