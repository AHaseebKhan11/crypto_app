class AddPhoneTousers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :phone_number, :string
    add_column :users, :phone_verification_pin, :string
    add_column :users, :phone_verified, :boolean
  end
end
