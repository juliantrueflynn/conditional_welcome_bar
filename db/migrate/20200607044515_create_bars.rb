# frozen_string_literal: true

class CreateBars < ActiveRecord::Migration[6.0]
  def change
    create_table :bars do |t|
      t.references :shop, index: true, foreign_key: { on_delete: :cascade }
      t.string :title, null: false
      t.text :content
      t.string :url
      t.boolean :active, default: false, null: false
      t.string :placement, default: "top", null: false
      t.boolean :sticky, default: true, null: false
      t.boolean :full_width_link, default: true, null: false
      t.boolean :new_tab_url, default: false, null: false
      t.boolean :close_button, default: true, null: false
      t.string :padding_y
      t.string :padding_x
      t.string :text_align
      t.string :text_color
      t.string :font_size
      t.string :background_color

      t.timestamps
    end
  end
end
