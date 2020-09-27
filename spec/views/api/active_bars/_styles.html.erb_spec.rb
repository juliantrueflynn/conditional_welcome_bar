# frozen_string_literal: true

require "rails_helper"

RSpec.describe "api/active_bars/_styles.html.erb" do
  it "renders font-size" do
    render "api/active_bars/styles", bar: build(:bar, font_size: "99px")

    expect(rendered).to have_content("font-size: 99px;")
  end

  it "renders text color" do
    render "api/active_bars/styles", bar: build(:bar, text_color: "rgba(123,123,123,5.0)")

    expect(rendered).to have_content("color: rgba(123,123,123,5.0);")
  end

  it "renders text align" do
    render "api/active_bars/styles", bar: build(:bar, text_align: "right")

    expect(rendered).to have_content("text-align: right;")
  end

  it "renders background color" do
    render "api/active_bars/styles", bar: build(:bar, background_color: "rgba(123,123,123,5.0)")

    expect(rendered).to have_content("background-color: rgba(123,123,123,5.0);")
  end

  describe "sticky" do
    it "renders sticky styling with top placement if true" do
      render "api/active_bars/styles", bar: build(:bar, sticky: true, placement: "top")

      expect(rendered).to have_content(".cw-bar__fixed")
      expect(rendered).to have_content(".cw-bar__fixed.cw-bar__top")
      expect(rendered).to have_no_content(".cw-bar__fixed.cw-bar__bottom")
    end

    it "renders sticky styling with bottom placement if true" do
      render "api/active_bars/styles", bar: build(:bar, sticky: true, placement: "bottom")

      expect(rendered).to have_content(".cw-bar__fixed")
      expect(rendered).to have_content(".cw-bar__fixed.cw-bar__bottom")
      expect(rendered).to have_no_content(".cw-bar__fixed.cw-bar__top")
    end

    it "renders no sticky styling if false" do
      render "api/active_bars/styles", bar: build(:bar, sticky: false)

      expect(rendered).to have_no_content(".cw-bar__fixed")
      expect(rendered).to have_no_content(".cw-bar__fixed.cw-bar__top")
      expect(rendered).to have_no_content(".cw-bar__fixed.cw-bar__bottom")
    end
  end

  describe "url" do
    it "renders url styling if present" do
      render "api/active_bars/styles", bar: build(:bar, url: "https://example.com")

      expect(rendered).to have_content(".cw-bar__content--linkable")
      expect(rendered).to have_content(".cw-bar__full-width-link .cw-bar__content")
    end

    it "renders no url styling if blank" do
      render "api/active_bars/styles", bar: build(:bar, url: nil)

      expect(rendered).to have_no_content(".cw-bar__content--linkable")
      expect(rendered).to have_no_content(".cw-bar__full-width-link .cw-bar__content")
    end
  end

  describe "close button" do
    it "renders styles for close button if true" do
      render "api/active_bars/styles", bar: build(:bar, close_button: true)

      expect(rendered).to have_content(".cw-bar__close")
      expect(rendered).to have_content(".cw-bar__close-btn")
    end

    it "renders no styles for close button if false" do
      render "api/active_bars/styles", bar: build(:bar, close_button: false)

      expect(rendered).to have_no_content(".cw-bar__close")
      expect(rendered).to have_no_content(".cw-bar__close-btn")
    end
  end
end
