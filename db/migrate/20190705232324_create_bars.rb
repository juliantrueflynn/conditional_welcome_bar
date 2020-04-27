# frozen_string_literal: true

class CreateBars < ActiveRecord::Migration[5.1]
  def change
    create_table :bars do |t|
      t.references :shop, index: true, foreign_key: { on_delete: :cascade }
      t.string :title, default: "Example Title", null: false
      t.text :content, default: "", null: false
      t.boolean :is_active, default: false, null: false
      t.string :url, default: "", null: false
      t.string :placement, default: "top", null: false
      t.boolean :is_sticky, default: true, null: false
      t.boolean :is_full_width_link, default: true, null: false
      t.boolean :is_new_tab_url, default: false, null: false
      t.string :page_templates, array: true, default: ["global"], null: false
      t.boolean :has_close_button, default: true, null: false
      t.string :padding_y, default: "10px", null: false
      t.string :padding_x, default: "15px", null: false
      t.string :text_align, default: "center"
      t.string :text_color, default: "rgba(255,255,255,1.0)", null: false
      t.string :font_size, default: "inherit"
      t.string :background_color, default: "rgba(45,52,54,1.0)"
      t.string :background_image
      t.string :background_image_repeat, default: "no-repeat"
      t.string :background_image_size_x, default: "auto"
      t.string :background_image_size_y, default: "auto"
      t.string :background_image_position_x, default: "center"
      t.string :background_image_position_y, default: "center"
      t.timestamps
    end
  end
end
