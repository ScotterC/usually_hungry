class ListItem < ApplicationRecord

  validates :name, presence: true
  validates :list_id, presence: true
  # TODO
  # Validates uniqueness of item within List
end
