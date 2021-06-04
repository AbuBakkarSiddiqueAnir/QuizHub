import mongoose from 'mongoose'

async function openDB(url: string, dbName?: string): Promise<typeof mongoose> {
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    }
    if (dbName) {
        Object.assign(options, { dbName: dbName })
    }

    let conn: typeof mongoose
    try {
        conn = await mongoose.connect(url, options)
    } catch (error) {
        throw Error('Failed to Open Database Connection')
    }

    return conn
}

async function closeDB(conn: typeof mongoose): Promise<void> {
    try {
        await conn.disconnect()
    } catch (error) {
        throw Error('Failed to Close Database Connection')
    }
}

export { openDB, closeDB }
