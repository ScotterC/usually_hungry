class CreateListItems < ActiveRecord::Migration[5.2]
  def change
    create_table :list_items do |t|
      t.references :list, index: { name: 'index_list_items_on_list_id' }
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
