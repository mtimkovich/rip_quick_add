import pytest
import rip_quick_add

# TODO: compare against current date.
@pytest.mark.parametrize('text,expected', [
        ('Dinner with Michael 7 p.m. tomorrow', 'https://www.google.com/calendar/render?action=TEMPLATE&text=Dinner+with+Michael+7+p.m.+tomorrow&dates=20220516T190000%2F20220516T200000'),
        ('Battle of BC 4 June 10th', None),
        # ('Calendar Tips meeting at Office at 5pm with hello@gappstips.com', None),
        # ('Service Type:  Deep Tissue / Sports Massage - 60 minutes\nDate and Time:  Wednesday, May 11 at 6 PM', None)
])
def test_input(text: str, expected: str):
    if expected is None:
        return
    url = rip_quick_add.create_invite_url(text)
    assert url == expected
