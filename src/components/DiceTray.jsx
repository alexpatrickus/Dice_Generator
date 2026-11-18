import { DIE_TYPES, MAX_DICE_PER_TYPE, totalDice } from '../lib/dice.js'

export function DiceTray({ counts, onCount, onRollOne, onRoll, onReset }) {
  const selected = totalDice(counts)

  return (
    <section className="panel" aria-labelledby="tray-heading">
      <div className="panel__head">
        <h2 id="tray-heading">Dice</h2>
        <p>{selected === 0 ? 'Add dice, or roll a single type.' : `${selected} selected`}</p>
      </div>
      <ul className="tray">
        {DIE_TYPES.map((sides) => {
          const count = counts[sides] ?? 0
          return (
            <li key={sides} className="tray__row">
              <button
                type="button"
                className={`die-roll die-roll--d${sides}`}
                aria-label={`Roll D${sides}`}
                onClick={() => onRollOne(sides)}
              >
                <span className="die-roll__shape">
                  <span className="die-roll__label">D{sides}</span>
                </span>
              </button>
              <div className="stepper">
                <button
                  type="button"
                  aria-label={`Remove one D${sides}`}
                  disabled={count === 0}
                  onClick={() => onCount(sides, count - 1)}
                >
                  −
                </button>
                <span aria-live="polite" aria-label={`${count} D${sides}`}>
                  {count}
                </span>
                <button
                  type="button"
                  aria-label={`Add one D${sides}`}
                  disabled={count >= MAX_DICE_PER_TYPE}
                  onClick={() => onCount(sides, count + 1)}
                >
                  +
                </button>
              </div>
            </li>
          )
        })}
      </ul>
      <div className="tray__actions">
        <button
          type="button"
          className="button button--roll"
          disabled={selected === 0}
          onClick={onRoll}
        >
          Roll selected
        </button>
        <button
          type="button"
          className="button button--reset"
          disabled={selected === 0}
          onClick={onReset}
        >
          Reset selection
        </button>
      </div>
    </section>
  )
}