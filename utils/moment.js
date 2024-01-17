import moment from 'moment'
moment.locale('my-mm', {
  months: 'ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ'.split(
    '_'
  ),
  monthsShort: 'ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ'.split(
    '_'
  ),
  monthsParseExact: true,
  weekdays: 'တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ'.split('_'),
  weekdaysShort: 'နွေ_လာ_ဂါ_ဟူး_တေး_ကြာ_နေ'.split('_'),
  weekdaysMin: 'နွေ_လာ_ဂါ_ဟူး_တေး_ကြာ_နေ'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm',
  },
  calendar: {
    lastDay: '[မနေ့က] LT',
    sameDay: '[ယနေ့] LT',
    nextDay: '[မနက်ဖြန်] LT',
    lastWeek: '[ပြီးခဲ့သည့်] dddd [နေ့] LT',
    nextWeek: 'dddd [နေ့] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s အတွင်း',
    past: 'ပြီးခဲ့သည့် %s',
    s: 'ပြီးခဲ့သည့်စက္ကန့်အနည်းငယ်',
    ss: '%d စက္ကန့်',
    m: 'a မိနစ်',
    mm: '%d မိနစ်',
    h: 'an နာရီ',
    hh: '%d နာရီ',
    d: 'တစ်ရက်',
    dd: '%d ရက်',
    M: 'တစ်လ',
    MM: '%d လ',
    y: 'a နှစ်',
    yy: '%d နှစ်',
  },
  meridiem: function (hour, minute, isLowercase) {
    if (hour < 10) {
      return 'မနက်'
    } else if (hour < 11 && minute < 30) {
      return 'နေ့လည်'
    } else if (hour < 13 && minute < 30) {
      return 'မွန်းတည့်'
    } else if (hour < 16) {
      return 'နေ့လည်'
    } else if (hour < 18) {
      return 'ညနေ'
    } else {
      return 'ည'
    }
  },
  week: {
    dow: 0, // Sunday is the first day of the week.
    doy: 4, // The week with Jan 4th is the first week of the year.
  },
})

export default moment
