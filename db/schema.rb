# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_07_055809) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bars", force: :cascade do |t|
    t.bigint "shop_id"
    t.string "title", null: false
    t.text "content"
    t.string "url"
    t.boolean "active", default: false, null: false
    t.string "placement", default: "top", null: false
    t.boolean "sticky", default: true, null: false
    t.boolean "full_width_link", default: true, null: false
    t.boolean "new_tab_url", default: false, null: false
    t.boolean "close_button", default: true, null: false
    t.string "padding_y"
    t.string "padding_x"
    t.string "text_align"
    t.string "text_color"
    t.string "font_size"
    t.string "background_color"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["shop_id"], name: "index_bars_on_shop_id"
  end

  create_table "shops", force: :cascade do |t|
    t.string "shopify_domain", null: false
    t.string "shopify_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shopify_domain"], name: "index_shops_on_shopify_domain", unique: true
  end

  create_table "theme_templates", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "bar_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["bar_id", "name"], name: "index_theme_templates_on_bar_id_and_name", unique: true
  end

  add_foreign_key "bars", "shops", on_delete: :cascade
  add_foreign_key "theme_templates", "bars", on_delete: :cascade
end
