import { DIE_TYPES, MAX_DICE_PER_TYPE, totalDice } from '../lib/dice.js'
import { DiceFace } from './DiceFace.jsx'

export function DiceTray({ counts, roll, onCount, onRollOne, onRoll, onReset }) {
  const selected = totalDice(counts)

  return (
    <section className="panel tray-panel" aria-labelledby="tray-heading">
      <div className="panel__head tray-panel__head">
        <h2 id="tray-heading">Dice</h2>
        {roll ? (
          <p className="tray-panel__total" aria-label={`Grand total ${roll.total}`}>
            Total <strong>{roll.total}</strong>
          </p>
        ) : (
          <p className="tray-panel__hint muted">Add dice, or roll a single type.</p>
        )}
      </div>
      <ul className="tray">
        {DIE_TYPES.map((sides) => {
          const count = counts[sides] ?? 0
          const rolledDice = roll?.dice.filter((die) => die.sides === sides) ?? []
          const rolledCount = rolledDice.length
          const rolledSum = roll?.sums[sides] ?? 0
          const rollDetailText = rolledDice.map((die) => die.value).join(', ')

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
              <div
                className={`tray__row-result${rolledCount > 0 ? ' tray__row-result--interactive' : ''}`}
                aria-live="polite"
                tabIndex={rolledCount > 0 ? 0 : undefined}
                aria-label={
                  rolledCount > 0
                    ? `${rolledCount}d${sides} total ${rolledSum}. Individual rolls: ${rollDetailText}`
                    : undefined
                }
              >
                {roll && rolledCount > 0 ? (
                  <>
                    <span>
                      {rolledCount}d{sides}
                    </span>
                    <strong>{rolledSum}</strong>
                    <p className="tray__row-popover" role="tooltip">
                      {rolledDice.map((die) => (
                        <span key={die.id}>{die.value}</span>
                      ))}
                    </p>
                  </>
                ) : (
                  <span className="tray__row-result--empty" aria-hidden="true">
                    —
                  </span>
                )}
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
          {selected === 0
            ? 'Roll selected'
            : `Roll ${selected} Selected ${selected === 1 ? 'Die' : 'Dice'}`}
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
      {roll && roll.dice.length > 0 ? (
        <ul className="faces tray__faces" aria-label="Individual dice results">
          {roll.dice.map((die) => (
            <li key={die.id}>
              <DiceFace sides={die.sides} value={die.value} />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}