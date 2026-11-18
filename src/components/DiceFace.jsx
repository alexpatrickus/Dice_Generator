import { rollValueTone } from '../lib/dice.js'

export function DiceFace({ sides, value }) {
  const wide = value >= 10
  const tone = rollValueTone(value, sides)

  return (
    <div className={`die die--d${sides}`} role="img" aria-label={`${value} on a D${sides}`}>
      <div className="die__shape">
        <span className="die__type">D{sides}</span>
        <span
          className={[
            'die__value',
            wide && 'die__value--wide',
            tone !== 'mid' && `die__value--${tone}`,
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden="true"
        >
          {value}
        </span>
      </div>
    </div>
  )
}