class CreatePostFiles < ActiveRecord::Migration
  def change
    create_table :post_files do |t|
      t.string :file_ref, null: false
      t.integer :file_type, null: false, default: 0
      t.belongs_to :post, index: true
      t.timestamps null: false
    end
  end
end
