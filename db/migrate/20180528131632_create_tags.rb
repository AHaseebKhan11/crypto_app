class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :name, null: false
      t.integer :post_count, default: 0

      t.timestamps null: false
    end
  end
end
