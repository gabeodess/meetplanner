require 'application_system_test_case'

class EventsTest < ApplicationSystemTestCase
  test 'create event' do
    @user = FactoryBot.create(:user)
    sign_in @user
    visit root_url
    click_on 'My Events'
    click_on 'Create Event'
    fill_in 'Title', with: :foobar
    fill_in 'event-sanction_id', with: :foobar
    fill_in 'event-fee', with: 0
    fill_in 'event-start_on', with: Date.today
    assert_difference '@user.events.count' do
      click_on 'Create'
      assert_text :foobar
    end
  end

  test 'delete event' do
    @event = FactoryBot.create(:event)
    sign_in @event.user
    visit root_url
    click_on 'My Events'
    assert_difference 'Event.count', -1 do
      click_on 'Delete'
      assert_no_text 'Delete'
    end
  end
end
