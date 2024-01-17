import {
  Form,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import styles from '../scss/Checkout.module.scss'
import moment from 'moment'
import request from '../utils/request'
const timeRanges = [
  {
    key: 'flexible',
    name: 'မည့်သည့်အချိန်ဖြစ်ဖြစ် အဆင်ပြေသည်',
    shortName: 'တစ်နေကုန်',
  },
  {
    key: '0900-1300',
    name: 'မနက် ၉နာရီ မှ နေ့လည် ၁နာရီ',
    shortName: '၉နာရီ - ၁နာရီ',
  },
  {
    key: '1400-1800',
    name: 'နေ့လည် ၂နာရီ မှ ညနေ ၆နာရီ',
    shortName: '၂နာရီ - ၆နာရီ',
  },
]

function getNext7Days() {
  let dates = []
  var fromDate = moment()
  var toDate = moment().add(30, 'days')
  while (fromDate <= toDate) {
    dates.push(fromDate)
    fromDate = fromDate.clone().add(1, 'd')
  }
  return dates
}

export default function DatesAndTimeRanges({ ...props }) {
  const [dates, setDates] = React.useState([])
  const [orderDates, setOrderDates] = React.useState([]) // order dates from db
  const [selectedDate, setSelectedDate] = React.useState(
    // new Date().getHours() < 17 ? moment().add(1, 'd') : moment().add(2, 'd')
  )
  const [selectedDeliveryTimeRange, setSelectedDeliveryTimeRange] = React.useState(timeRanges[0])

  React.useEffect(() => {
    setDates(getNext7Days())
    getOrderDates()
    props.onSelectTimeRange(selectedDeliveryTimeRange)
  }, [])

  async function getOrderDates() {
    try {
      const response = await request('order-dates', {
        params: { platform: 'new_web' },
      })

      if (response.success) {
        const earliestOrderDate = _.find(response.data, { disabled: false })
        setOrderDates(response.data)
        setSelectedDate(moment(earliestOrderDate.date))
        props.onSelectDate(moment(earliestOrderDate.date))
      }
    } catch (error) {
      alert('Error fetching order dates', error)
    }
  }

  return (
    <div>
      <ul className={`${styles.deliveryDates} p-3`}>
        {dates.map((date, index) => {
          const data = _.find(orderDates, (oD) =>
            moment(oD.date).isSame(date, 'day')
          )
          return (
            <li className='list-inline-item' key={index}>
              {data && data.disabled ? (
                <OverlayTrigger
                  placement={'top'}
                  overlay={
                    <Tooltip id={`tooltip-top`}>
                      <strong>အော်ဒါပြည့်နေသည်</strong>
                    </Tooltip>
                  }
                >
                  <button
                    disabled={data.disabled}
                    onClick={() => {
                      setSelectedDate(date)
                      props.onSelectDate(date)
                    }}
                    className={`${styles.dateItem} btn ${(moment(selectedDate).format('YYYY-MM-DD').toString() === moment(date).format('YYYY-MM-DD').toString()) &&
                      // selectedDate.toString() === date.toString() &&
                      styles.selected
                      }`}
                  >
                    <span className={styles.date}>
                      {date.format('D')}
                    </span>
                    <div
                      className={styles.dateName + ' text-truncate'}
                    >
                      {date.format('dddd')}
                    </div>
                  </button>
                </OverlayTrigger>
              ) : (
                  <button
                    disabled={!data || (data && data.disabled)}
                    onClick={() => {
                      setSelectedDate(date)
                      props.onSelectDate(date)
                    }}
                    className={`${styles.dateItem} btn ${(moment(selectedDate).format('YYYY-MM-DD').toString() === moment(date).format('YYYY-MM-DD').toString()) &&
                      styles.selected
                      }`}
                  >
                    <span className={styles.date}>
                      {date.format('D')}
                    </span>
                    <div className={styles.dateName + ' text-truncate'}>
                      {date.format('dddd')}
                    </div>
                  </button>
                )}
            </li>
          )
        })}
      </ul>
      <ul className='list-unstyled px-3'>
        {timeRanges.map((timeRange, index) => (
          <li key={index} className='py-2'>
            <Form.Check
              type={'checkbox'}
              id={`time-range-${timeRange.key}`}
              custom
            >
              <Form.Check.Input
                checked={
                  timeRange.key === selectedDeliveryTimeRange.key
                }
                type={'checkbox'}
                onClick={() => {
                  setSelectedDeliveryTimeRange(timeRange)
                  props.onSelectTimeRange(timeRange)
                }
                }
              />
              <Form.Check.Label>{timeRange.name}</Form.Check.Label>
            </Form.Check>
          </li>
        ))}
      </ul>
    </div>
  )
}