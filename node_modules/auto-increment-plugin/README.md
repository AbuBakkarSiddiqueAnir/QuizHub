# auto-increment-plugin
Mongoose Schema Plugin for Auto Increment Field

## Quick Guide
Create a Mongoose Schema that will add auto increment field:
```js
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})
```

Then, apply the plugin to the Schema, and create a Mongoose Model:
```js
UserSchema.plugin(AutoIncrementPlugin, {
    model_name: 'User',
})
const User = mongoose.model('User', UserSchema)
```
You must specify the name of a model when applying the plugin.

After that, auto-increasing ```id``` field will be created:
```js
await new User({ username: '1' }).save()
const user = await User.findOne({ username: '1' })
console.log(user.id)    // 1
```

## Advanced
There are several options for the plugin:
```js
UserSchema.plugin(AutoIncrementPlugin, {
    model_name: 'User',
    field: 'my_id',
    id_model: 'MyId',
})
```

- ```field```: The name of an auto-increment field (Default: ```id```)
- ```id_model```: The name of a model that saves current count (Default: ```model_name + 'Id'```)
