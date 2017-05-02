import test from 'ava'
import { transform } from 'babel-core'

const transpile = src => {
  return transform(src, {
    plugins: './index'
  }).code.trim()
}

test('Generic functional export', t => {
  t.is(
    transpile(`export const a = ({ props, listeners }) => <div onClick={listeners.click}>{props.msg}</div>`),
    `export const a = {
  functional: true,
  render: (h, { props, listeners }) => <div onClick={listeners.click}>{props.msg}</div>
};`
  )
})
