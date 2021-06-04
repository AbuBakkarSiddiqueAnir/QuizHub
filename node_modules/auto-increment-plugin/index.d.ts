interface Options {
    model_name: string
    field?: string
    id_model?: string
}

declare module 'auto-increment-plugin' {
    import mongoose = require('mongoose')
    const _: (schema: mongoose.Schema, options: Options) => void
    export = _
}
