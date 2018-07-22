class AddFieldsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :info, :jsonb, null: false, default: '{}'
    add_column :users, :role, :integer, null: false, default: 0
    add_column :users, :resume, :string
  end
end
