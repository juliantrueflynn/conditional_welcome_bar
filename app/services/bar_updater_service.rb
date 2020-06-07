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
    theme_templates_to_create.merge(theme_templates_marked_for_destruction)
  end

  def theme_templates_to_create
    @theme_templates.index_with do |name|
      { name: name }
    end
  end

  def theme_templates_marked_for_destruction
    unchanged_theme_templates = @bar.theme_templates.where.not(name: @theme_templates)

    unchanged_theme_templates.each_with_object({}) do |template, destroy_templates|
      destroy_templates[template.name] = { id: template.id, _destroy: "1" }
    end
  end
end
