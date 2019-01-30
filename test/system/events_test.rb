require 'application_system_test_case'

class EventsTest < ApplicationSystemTestCase
  test 'show event' do
    event = FactoryBot.create(:event)
    sign_in event.user
    visit root_url
    click_on 'My Events'
    click_on 'Show'
    assert_text event.title
  end

  test 'edit event' do
    title1 = 'foobar'
    title2 = 'foobar2'
    @event = FactoryBot.create(:event, title: title1)
    sign_in @event.user
    visit root_url
    click_on 'My Events'
    click_on 'Edit'
    fill_in 'Title', with: title2
    assert_changes -> { @event.reload.title }, from: title1, to: title2 do
      click_on 'Update Event'
      assert_no_text 'Edit Event'
    end
  end

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
    fill_in 'event-organizer', with: :foobar
    fill_in 'event-street', with: :foobar
    fill_in 'event-city', with: :foobar
    fill_in 'event-state', with: :foobar
    fill_in 'event-zipcode', with: :foobar
    fill_in 'event-email', with: 'foo@bar.com'
    fill_in 'event-phone', with: :foobar
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
