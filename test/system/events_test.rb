require 'application_system_test_case'

class EventsTest < ApplicationSystemTestCase
  test 'search events' do
    t1 = rand
    t2 = rand
    FactoryBot.create(:event, title: t1)
    FactoryBot.create(:event, title: t2)
    visit root_url
    within '.navbar' do
      click_on('Browse Events')
    end
    assert_text t1
    assert_text t2
    fill_in 'q[title_cont]', with: t1
    click_on 'Search'
    assert_no_text t2
    assert_text t1
  end

  test 'show event' do
    event = FactoryBot.create(:event)
    visit root_url
    within '.navbar' do
      click_on 'Browse Events'
    end
    click_on event.title
    within '.card' do
      assert_text event.title
    end
  end

  test 'create event' do
    @user = FactoryBot.create(:user)
    @end_date = Date.tomorrow
    sign_in @user
    visit root_url
    click_on 'My Events'
    click_on 'Create Event'
    fill_in 'Title', with: :foobar
    fill_in 'event-sanction_id', with: :foobar
    fill_in 'event-fee', with: 0
    fill_in 'event-start_on', with: Date.today
    check 'multiday'
    fill_in 'event-end_on', with: @end_date
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
    event = Event.last
    assert_nil event.closed_at
    assert_equal event.end_on, @end_date
  end
end
