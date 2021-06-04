import { Schema, model, Model } from 'mongoose'

function createIdModel(id_model_name: string): void {
    const IdSchema = new Schema({ id: Number })
    model(id_model_name, IdSchema)
}

function getIdModel(id_model_name: string): Model<any> {
    return model(id_model_name)
}

async function setIdModel(id_model: Model<any>): Promise<void> {
    const id_obj = await id_model.findOne()
    if (!id_obj) {
        await new id_model({ id: 1 }).save()
    } else {
        id_obj.id++
        await id_obj.save()
    }
}

async function setAutoIncrement(obj: any, id_model: Model<any>, field: string): Promise<void> {
    try {
        await obj.updateOne({
            $set: {
                [field]: (await id_model.findOne())!.id,
            },
        })
    } catch (error) {
        console.log(error)
        console.log(`ERROR: ${id_model.modelName} Does Not Exist`)
    }
}

export default function (schema: Schema, options: Options) {
    const model_name = options.model_name.charAt(0).toUpperCase() + options.model_name.slice(1)
    const id_model = options.id_model ? options.id_model : `${model_name}Id`
    const field = options.field ? options.field : 'id'
    createIdModel(id_model)
    schema.add({ [field]: Number })

    schema.post('save', async function (this: any) {
        const Id = getIdModel(id_model)
        await setIdModel(Id)
        await setAutoIncrement(this, Id, field)
    })
}
