import { DIE_TYPES } from '../lib/dice.js'
import { DiceFace } from './DiceFace.jsx'

export function RollResults({ roll, showIndividual }) {
  if (!roll) {
    return (
      <section className="panel results" aria-live="polite">
        <h2>Results</h2>
        <p className="muted">Roll a die to see a result.</p>
      </section>
    )
  }

  const used = DIE_TYPES.filter((sides) => roll.dice.some((die) => die.sides === sides))

  return (
    <section className="panel results" aria-live="polite">
      <div className="panel__head results__head">
        <h2>Results</h2>
        <p className="results__total" aria-label={`Grand total ${roll.total}`}>
          Total <strong>{roll.total}</strong>
        </p>
      </div>
      {showIndividual && (
        <ul className="faces">
          {roll.dice.map((die) => (
            <li key={die.id}>
              <DiceFace sides={die.sides} value={die.value} />
            </li>
          ))}
        </ul>
      )}
      <ul className="sums">
        {used.map((sides) => {
          const count = roll.dice.filter((die) => die.sides === sides).length
          return (
            <li key={sides}>
              <span>
                {count}d{sides}
              </span>
              <strong>{roll.sums[sides]}</strong>
            </li>
          )
        })}
      </ul>
    </section>
  )
}