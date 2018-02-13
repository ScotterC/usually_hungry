class List < ApplicationRecord
  belongs_to :owner, class_name: "User"

  has_many :items, class_name: "ListItem"

  validates :name, presence: true
  validates :owner_id, presence: true
end
