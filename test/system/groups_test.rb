require 'application_system_test_case'

class GroupsTest < ApplicationSystemTestCase
  test 'create group' do
    event = FactoryBot.create(:event)
    sign_in event.user
    visit root_url
    click_on 'My Events'
    click_on 'Manage'
    click_on 'Create Session'
    fill_in 'Description', with: :foobar
    fill_in 'Date', with: Date.today
    fill_in 'Weigh-in Time', with: Time.now
    fill_in 'Start Time', with: 1.hour.from_now
    assert_difference -> { event.groups.count } do
      click_on 'Submit'
      assert_text 'Manage Athletes'.upcase
    end
  end

  test 'update group' do
    d1 = 'foobar1'
    d2 = 'foobar2'
    group = FactoryBot.create(:group, description: d1)
    sign_in group.user
    visit root_url
    click_on 'My Events'
    click_on 'Manage'
    click_on 'Edit info'
    fill_in 'Description', with: d2
    click_on 'Submit'
    assert_text d2
    assert_no_text d1
  end

  test 'delete group' do
    group = FactoryBot.create(:group, description: 'foobar description')
    sign_in group.user
    visit root_url
    click_on 'My Events'
    click_on 'Manage'
    assert_text group.description
    assert_difference -> { group.user.groups.count }, -1 do
      click_on 'Delete'
      assert_no_text group.description
    end
  end
end
