class CreateParticipants < ActiveRecord::Migration[5.2]
  def change
    create_table :participants do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.string :usaw_id, null: false
      t.string :club
      t.string :coach
      t.integer :gender, null: false
      t.integer :year_of_birth, null: false
      t.integer :division, null: false
      t.integer :category, null: false
      t.integer :entry_total, null: false
      t.belongs_to :event, foreign_key: true, null: false

      t.timestamps
    end
    add_index :participants, %i[event_id usaw_id]
  end
end
