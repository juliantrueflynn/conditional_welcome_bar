class CreateBars < ActiveRecord::Migration[5.1]
  def change
    create_table :bars do |t|
      t.references :shop, foreign_key: true
      t.string :title, null: false
      t.text :content, default: '', null: false
      t.boolean :is_active, default: false, null: false
      t.string :url
      t.string :placement, default: 'top', null: false
      t.boolean :is_sticky, default: true, null: false
      t.boolean :is_full_width_link, default: true, null: false
      t.boolean :is_new_tab_url, default: false, null: false
      t.string :page_template, default: 'global', null: false
      t.boolean :has_close_button, default: true, null: false
      t.string :padding_top
      t.string :padding_right
      t.string :padding_bottom
      t.string :padding_left
      t.string :text_align, default: 'center'
      t.float :text_opacity, default: 1.0
      t.string :font_color, default: '#ffffff', null: false
      t.string :font_size
      t.string :font_family, default: 'inherit'
      t.float :background_opacity, default: 1.0
      t.string :background_color, default: '#2d3436'
      t.string :background_image
      t.string :background_image_repeat, default: 'no-repeat'
      t.string :background_image_size_x, default: 'auto'
      t.string :background_image_size_y, default: 'auto'
      t.string :background_image_position_x, default: 'center'
      t.string :background_image_position_y, default: 'center'

      t.timestamps
    end
  end
end
