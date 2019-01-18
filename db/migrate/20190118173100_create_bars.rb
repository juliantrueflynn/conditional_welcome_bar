class CreateBars < ActiveRecord::Migration[5.1]
  def change
    create_table :bars do |t|
      t.references :shop, foreign_key: true
      t.string :title, null: false
      t.text :content, default: '', null: false
      t.string :url
      t.string :placement, default: 'top', null: false
      t.boolean :is_sticky, default: true, null: false
      t.boolean :is_new_tab_url, default: false, null: false
      t.string :text_color, default: '#ffffff', null: false
      t.string :template_enabled, default: 'global', null: false
      t.boolean :has_close_button, default: true, null: false
      t.string :background_color, default: '#2d3436'

      t.timestamps
    end
  end
end
