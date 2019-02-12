require 'application_system_test_case'

class CalculatorsTest < ApplicationSystemTestCase
  test 'calculator' do
    visit '/calculator'
    check = 'Sinclair-Meltzer-Faber Total'
    assert_no_text check
    find('[for=type-masters]').click
    assert_text check
  end
end
