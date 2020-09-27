# frozen_string_literal: true

require "rails_helper"

RSpec.describe "api/active_bars/show.html.erb" do
  describe "content" do
    it "renders link if url present" do
      bar = build(:bar, url: "https://example.com")
      assign :bar, bar

      render

      expect(rendered).to have_link(bar.content, href: bar.url)
      expect(rendered).to have_css("a#cw_bar_content")
      expect(rendered).to have_no_css("div#cw_bar_content")
    end

    it "renders no url styling if blank" do
      bar = build(:bar, url: nil)
      assign :bar, bar

      render

      expect(rendered).to have_content(bar.content)
      expect(rendered).to have_css("div#cw_bar_content")
      expect(rendered).to have_no_link(bar.content)
    end
  end

  describe "close button" do
    it "renders close button if true" do
      assign :bar, build(:bar, close_button: true)

      render

      expect(rendered).to have_button("\u00D7")
    end

    it "renders no styles for close button if false" do
      assign :bar, build(:bar, close_button: false)

      render

      expect(rendered).to have_no_button("\u00D7")
    end
  end
end
