'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 30).notNullable()
      table.string('phone', 20).notNullable()
      table.string('email', 100).notNullable().unique()
      table.enu('profile', ['user', 'admin', 'super']).defaultTo('user')
      table.string('password', 72).notNullable()
      table.string('hash_confirm_email', 32)
      table.string('hash_change_password', 32)
      table.boolean('confirm_email').defaultTo(false)
      table.boolean('deleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
