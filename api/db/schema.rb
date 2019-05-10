# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20190118173100) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bars", force: :cascade do |t|
    t.bigint "shop_id"
    t.string "title", default: "Example Title", null: false
    t.text "content", default: "", null: false
    t.boolean "is_active", default: false, null: false
    t.string "url", default: "", null: false
    t.string "placement", default: "top", null: false
    t.boolean "is_sticky", default: true, null: false
    t.boolean "is_full_width_link", default: true, null: false
    t.boolean "is_new_tab_url", default: false, null: false
    t.string "page_templates", default: ["global"], null: false, array: true
    t.boolean "has_close_button", default: true, null: false
    t.string "padding_y", default: "10px", null: false
    t.string "padding_x", default: "15px", null: false
    t.string "text_align", default: "center"
    t.float "text_opacity", default: 1.0
    t.string "text_color", default: "#ffffff", null: false
    t.string "font_size", default: "inherit"
    t.float "background_opacity", default: 1.0
    t.string "background_color", default: "#2d3436"
    t.string "background_image"
    t.string "background_image_repeat", default: "no-repeat"
    t.string "background_image_size_x", default: "auto"
    t.string "background_image_size_y", default: "auto"
    t.string "background_image_position_x", default: "center"
    t.string "background_image_position_y", default: "center"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shop_id"], name: "index_bars_on_shop_id"
  end

  create_table "shops", force: :cascade do |t|
    t.string "shopify_domain", null: false
    t.string "shopify_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shopify_domain"], name: "index_shops_on_shopify_domain", unique: true
  end

  add_foreign_key "bars", "shops"
end
