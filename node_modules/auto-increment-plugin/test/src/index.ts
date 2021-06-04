process.env.NODE_ENV = 'test'

import './env'
import assert from 'assert'
import { cloneDeep } from 'lodash'
import { describe, it } from 'mocha'
import { Collection } from 'mongodb'
import mongoose, { Model, model } from 'mongoose'
import AutoIncrementPlugin from '../../lib'
import { closeDB, openDB } from './connection'
import { UserSchema } from './models/User'
import options from '../options.json'

before('Loaded .env', () => {
    assert(process.env.DB_URL)
    assert(process.env.DB_NAME)
})
describe('auto-increment-plugin', () => {
    let conn: typeof mongoose

    before('Connect to an Empty Database', async () => {
        conn = await openDB(process.env.DB_URL!, process.env.DB_NAME!)
        const collections = await conn.connection.db.collections()
        collections.forEach(async (col: Collection<any>) => {
            assert(await col.countDocuments() == 0)
        })
    })
    describe('Check Auto Increment Field', () => {
        options.forEach((option: Options, i: number) => {
            let field: string
            let Schema: mongoose.Schema
            let User: Model<any>

            before('Create a Model', async () => {
                field = option.field ? option.field : 'id'
                Schema = cloneDeep(UserSchema).plugin(AutoIncrementPlugin, option)
                User = model(`User${i}`, Schema)
                await User.init()
            })
            it(`Case ${i}: ${Object.keys(option)}`, async () => {
                await new User({ username: '1' }).save()
                assert((await User.findOne({ username: '1' }))[field] == 1)
                await new User({ username: '2' }).save()
                assert((await User.findOne({ username: '2' }))[field] == 2)
                try {
                    await new User({ username: '2' }).save()
                } catch (error) {}
                await new User({ username: '3' }).save()
                assert((await User.findOne({ username: '3' }))[field] == 3)
                await User.deleteOne({ username: '3' })
                assert(!(await User.findOne({ username: '3' })))
                await new User({ username: '4' }).save()
                assert((await User.findOne({ username: '4' }))[field] == 4)
                await User.deleteOne({ username: '1' })
                assert(!(await User.findOne({ username: '1' })))
                await new User({ username: '5' }).save()
                assert((await User.findOne({ username: '5' }))[field] == 5)
            })
        })
    })
    after('Drop the Database and Close Connection', async () => {
        await conn.connection.db.dropDatabase();
        const collections = await conn.connection.db.collections()
        collections.forEach(async (col: Collection<any>) => {
            assert(await col.countDocuments() == 0)
        })
        closeDB(conn)
    })
})
