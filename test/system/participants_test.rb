require 'application_system_test_case'

class ParticipantsTest < ApplicationSystemTestCase
  test 'participant registration' do
    title = 'foobar'
    @event = FactoryBot.create(:event, title: title)
    visit root_url
    within '.container' do
      click_on 'Browse Events'
    end
    click_on title
    click_on 'Register'
    fill_in 'First name', with: 'foobar'
    fill_in 'Last name', with: 'foobar'
    fill_in 'Email', with: 'foo@bar.com'
    fill_in 'USAW Member ID', with: '123456'
    fill_in 'Club', with: 'foobar'
    fill_in 'Coach', with: 'foobar'
    choose 'Gender', with: 'F'
    fill_in 'Year of Birth', with: 2000
    select 'Category', with: 55
    fill_in 'Entry total', with: 145
    assert_selector 'a', text: 'View event'
  end
end
