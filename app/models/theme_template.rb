# frozen_string_literal: true

class ThemeTemplate < ApplicationRecord
  belongs_to :bar

  validates :name, presence: true
  validates :bar_id, uniqueness: { scope: :name }
end
