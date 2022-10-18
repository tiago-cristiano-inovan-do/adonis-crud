# adonis-crud


<p>Advanced abstraction to use with Adonis Framework.<p>

# Installation

```bash
npm install adonis-crud

```

## Config package
  - Configure the package using `node ace configure adonis-crud`. This should update your `.adonisrc.json` file and `tsconfig.json` file.


## Create the route for the resource

- in **routes.ts** add
```ts
Route.resource('/posts', 'PostController')
```


### Create the migration to the model
```ts
import BaseSchema from '@ioc:Adonis/Lucid/Schema'
export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('content').notNullable()
      table.boolean('status').defaultTo(true)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

```

## Create the model to persist data to the database.
```bash
  node ace make:model Post
```

## Fulfill as needed

```ts
import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Post extends BaseModel {
 @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public status: boolean

  @column()
  public title: string

  @column()
  public content: string
}
```


## Create your repository to deal with your model using the decorator provided.


```ts
import Event from '@ioc:Adonis/Core/Event'
import CrudRepository, { CrudRepositoryInterface } from '@ioc:AdonisCrud/Crud/Repository'
import User from 'App/Models/Post'

@CrudRepository<Post>({
  event: Event,
  model: Post,
  selectFields: ['id', 'nome', 'age'],
 
})
export default class PostRepository implements CrudRepositoryInterface<Post> {}

```

### Crud repository props.

Property |  Description    | Required?|
------- | -----------| -----------|
**event**  | Event emiter from Adonis to be used in hooks features | &#9745;
**model**  | Model     | &#9745;
**selectFields** | Array of fields to be used in select | &#9745;




## Create your transformer

```ts
import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
export default class PostTransformer extends TransformerAbstract {
  public transform(model) {
    return {
      id: model.id,
      status: model.status,
      title: model.title,
      content: model.content,
      createdAt: model.createdAt,
    }
  }
}

```
> Here you can format or transform the data, format a date, make a computed property....



## Create your controller and use the decorator provided

```ts
import Crud, { CrudControllerInterface, OptionsCrud } from '@ioc:AdonisCrud/Crud/Controller'
import Post from 'App/Models/Post'
import PostRepository from '@ioc:PostRepository'
import BaseTransformer from 'App/Transformers/BaseTransformer'

@Crud<Post>({
  repository: PostRepository,
  storeProps: ['title','content'],
  updateProps: ['content'],
  transformer: BaseTransformer,
  validators: {
    store: '', //Adonis validator class
    update: ''
  }
})
export default class PostsController<Post> implements CrudControllerInterface<Post> {
  options: OptionsCrud<Post>
}
```

### Crud decorator options


Property |  Description    | Required?|
------- | -----------| -----------|
**repository**  | Repository used to deal with your model data.| &#9745;
**storeProps**  | Allow properties to create your model.     | &#9745;
**updateProps** | Allow properties to update your model.|
**transformer** | Array of fields to be used in select | &#9745;
**validators**  | [Validator class](https://docs.adonisjs.com/guides/validator/introduction#validator-classes) for each method used to store and update ] |&#9744;

> If a not allowed param is provide in store or update request a exception will be returned.

> If a validator object is not provided no validation will be apply to store and update methods.



### Features
-  &#9745; Crud Abstraction
-  &#9745; Validators
-  &#9745; Events (on update, on delete, on create)
-  &#9745; Intercept flow and develop your own bussines logic
-  &#9745; Apply Scoped Queries
-  &#9745; Tranformer with includes (join relationship automagically). Thanks to [adonis-bublebee-ts](https://github.com/kmorpex/adonis-bublebee-ts).
-  &#9745; Generate report csv/ pdf.
- Acl based on Adonis ACL



### **C**reate
 - Validate data to create based on Adonis Validators.
 - Bulk Insert

 ### **R**ead
  - Default pagination
  - Feature includes (add relationship to return data)
  - Query builder from request params
  - Feature All (get all itens)
  - Configurable select fields
  - Configurable order 
  - Configurable

### **U**pdate
   - Validate update props based on adonis validators
   - Bulk update

### **D**elete
 - Default soft delete strategy
 - Bulk delete


### Dependencies
- [Adonis ACL](https://github.com/shagital/adonisjs-acl) for role and permission management
- [Adonis Bublebee ts](https://github.com/kmorpex/adonis-bublebee-ts) for tranform and include data to response.