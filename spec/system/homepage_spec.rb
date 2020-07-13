# frozen_string_literal: true

require "rails_helper"

RSpec.describe "homepage", type: :system, js: true do
  it "redirects user to login page if unauthorized" do
    visit root_path

    expect(page).to have_current_path("/login")
  end
end
