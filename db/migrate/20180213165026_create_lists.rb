class CreateLists < ActiveRecord::Migration[5.2]
  def change
    create_table :lists do |t|
      t.string :name
      t.text :description
      t.integer :owner_id, null: false

      t.timestamps
    end

  end
end
