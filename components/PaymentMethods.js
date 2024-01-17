import { Form } from 'react-bootstrap'
const paymentMethods = [
  {
    key: 'cod',
    name: 'အိမ်ရောက်ငွေချေ',
    shortName: 'အိမ်ရောက်ငွေချေ',
  },
  {
    key: 'bank_transfer',
    name: 'ဘဏ်လွှဲ',
    shortName: 'ဘဏ်လွှဲ',
    subs: [
      {
        key: 'kbz',
        name: 'KBZ',
        shortName: 'KBZ',
      },
      {
        key: 'cb',
        name: 'CB',
        shortName: 'CB',
      },
      {
        key: 'aya',
        name: 'AYA',
        shortName: 'AYA',
      },
    ],
  },
  // {
  //   key: 'ayapay',
  //   name: 'AYA PAY',
  //   shortName: 'ayapay'
  // },
  // {
  //   key: 'mptpay',
  //   name: 'MPT MONEY',
  //   shortName: 'mptpay'
  // }
]
export default function PaymentMethods({ ...props }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState(paymentMethods[0])
  const [selectedSubPaymentMethod, setSelectedSubPaymentMethod] = React.useState(null)

  React.useEffect(() => {
    console.log('child useeffect')
    props.onSelectPaymentMethod(paymentMethods[0])
    props.onSelectSubPaymentMethod(selectedSubPaymentMethod)
  }, [])

  return (
    <div>
      <ul className='list-unstyled px-3'>
        {paymentMethods.map((paymentMethod) => (
          <li key={paymentMethod.key} className='py-2'>
            <Form.Check
              type={'checkbox'}
              id={`payment-method-${paymentMethod.key}`}
              custom
            >
              <Form.Check.Input
                checked={
                  paymentMethod.key === selectedPaymentMethod.key
                } 
                type={'checkbox'}
                onClick={() => {
                  setSelectedPaymentMethod(paymentMethod)
                  props.onSelectPaymentMethod(paymentMethod)
                }}
              />
              <Form.Check.Label>{paymentMethod.name}</Form.Check.Label>
              {paymentMethod.subs &&
                paymentMethod.key === selectedPaymentMethod.key && (
                  <ul className='list-unstyled pl-0'>
                    {paymentMethod.subs.map((subPaymentMethod) => (
                      <Form.Check
                        type={'checkbox'}
                        id={`sub-payment-method-${subPaymentMethod.key}`}
                        custom
                        key={subPaymentMethod.key}
                      >
                        <Form.Check.Input
                          checked={
                            selectedSubPaymentMethod &&
                            subPaymentMethod.key ===
                            selectedSubPaymentMethod.key
                          }
                          type={'checkbox'}
                          onClick={() => {
                            setSelectedSubPaymentMethod(subPaymentMethod)
                            props.onSelectSubPaymentMethod(subPaymentMethod)
                          }

                          }
                        />
                        <Form.Check.Label>
                          {subPaymentMethod.name}
                        </Form.Check.Label>
                      </Form.Check>
                    ))}
                  </ul>
                )}
            </Form.Check>
          </li>
        ))}
      </ul>
    </div>
  )
}