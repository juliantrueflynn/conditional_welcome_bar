# frozen_string_literal: true

class CreateThemeTemplates < ActiveRecord::Migration[6.0]
  def change
    create_table :theme_templates do |t|
      t.string :name, null: false
      t.references :bar, index: false, foreign_key: { on_delete: :cascade }, null: false

      t.timestamps
    end

    add_index :theme_templates, %i[bar_id name], unique: true
  end
end
