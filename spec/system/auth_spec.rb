require 'rails_helper'

RSpec.describe "Authentication", type: :system do
  it "logs in a user" do
    user = User.create!(email: "user@example.com", password: "password", password_confirmation: "password")

    visit root_path
    click_link "Sign In"
    fill_in "user_email", with: user.email
    fill_in "user_password", with: 'password'
    click_button "Log in"

    expect(page).to have_text("Signed in successfully.")
  end
end