class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :title, null: false
      t.string :organizer, null: false
      t.string :sanction_id, null: false
      t.decimal :fee, null: false, precision: 8, scale: 2
      t.text :description, null: false
      t.date :start_on, null: false
      t.date :end_on
      t.string :street, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :zipcode, null: false
      t.string :phone, null: false
      t.string :email, null: false
      t.belongs_to :user, foreign_key: true, null: false

      t.timestamps
    end
    add_index :events, :sanction_id, unique: true
  end
end
