class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.belongs_to :post, index: true
      t.references  :commented_post
      t.timestamps null: false
    end
  end
end
