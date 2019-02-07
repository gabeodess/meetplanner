class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.text :description, null: false
      t.date :date, null: false
      t.time :weigh_in_at, null: false
      t.time :start_at, null: false
      t.integer :athletes_count, default: 0, null: false
      t.belongs_to :event, foreign_key: true

      t.timestamps
    end
  end
end
