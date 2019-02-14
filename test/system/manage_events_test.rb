require 'application_system_test_case'

class ManageEventsTest < ApplicationSystemTestCase
  test 'close event' do
    @event = FactoryBot.create(:event)
    sign_in @event.user
    visit root_url
    click_on 'My Events'
    click_on 'Manage'
    open = 'Open Registration'
    close = 'Close Registration'
    freeze_time do
      assert_changes -> { @event.reload.closed_at }, from: nil, to: Time.now do
        assert_no_text open.upcase
        click_on close
        assert_text open.upcase
        assert_no_text close.upcase
      end
    end
    time = @event.closed_at
    assert_changes -> { @event.reload.closed_at }, from: time, to: nil do
      assert_no_text close.upcase
      click_on open
      assert_text close.upcase
    end
  end

  test 'manage event' do
    @event = FactoryBot.create(:event)
    sign_in @event.user
    visit root_url
    click_on 'My Events'
    click_on 'Manage'
    assert_text 'Edit Event Info'.upcase
  end

  test 'edit event' do
    title1 = 'foobar'
    title2 = 'foobar2'
    date = Date.tomorrow
    @event = FactoryBot.create(:event, title: title1, end_on: date)
    sign_in @event.user
    visit root_url
    click_on 'My Events'
    click_on 'Manage'
    click_on 'Edit Event Info'
    fill_in 'Title', with: title2
    uncheck 'multiday'
    assert_changes -> { @event.reload.end_on }, from: date, to: nil do
      assert_changes -> { @event.reload.title }, from: title1, to: title2 do
        click_on 'Update Event'
        assert_no_text 'Edit Event'
      end
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
