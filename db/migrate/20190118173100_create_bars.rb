class CreateBars < ActiveRecord::Migration[5.1]
  def change
    create_table :bars do |t|
      t.references :shop, foreign_key: true
      t.string :title, null: false
      t.text :content, default: '', null: false
      t.string :position, default: 'fixed', null: false
      t.string :location, default: 'top', null: false
      t.string :url
      t.boolean :is_new_tab_url, default: false, null: false
      t.string :text_color, default: '#ffffff', null: false
      t.string :bg_color, default: '#2d3436', null: false
      t.string :template_enabled, default: 'global', null: false
      t.boolean :has_close_button, default: true, null: false

      t.timestamps
    end
  end
end
