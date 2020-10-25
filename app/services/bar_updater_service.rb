# frozen_string_literal: true

class BarUpdaterService
  def self.call(bar, attributes = {})
    new(bar, attributes).call
  end

  def initialize(bar, attributes)
    @bar = bar
    @bar_attributes = attributes.except(:theme_templates)
    @theme_templates = attributes.fetch(:theme_templates, [])
  end

  def call
    return false if @bar.blank?

    @bar.update @bar_attributes.merge(theme_templates_attributes: theme_templates_attributes)
  end

  private

  def theme_templates_attributes
    theme_templates_input_map.merge(theme_templates_persisted)
  end

  def theme_templates_persisted
    @bar.theme_templates.each_with_object({}) do |template, persisted_templates|
      persisted_templates[template.name] = { id: template.id, name: template.name }
      persisted_templates[template.name][:_destroy] = "1" if theme_templates_input_map[template.name].blank?
    end
  end

  def theme_templates_input_map
    @_theme_templates_input_map ||= @theme_templates.index_with do |name|
      { name: name }
    end
  end
end
