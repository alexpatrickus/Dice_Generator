import { useState } from 'react'
import { DiceTray } from './components/DiceTray.jsx'
import {
  EMPTY_COUNTS,
  EMPTY_MODIFIERS,
  clampCount,
  clampModifier,
  rollSelection,
  singleTypeCounts,
} from './lib/dice.js'

export default function App() {
  const [counts, setCounts] = useState(EMPTY_COUNTS)
  const [modifiers, setModifiers] = useState(EMPTY_MODIFIERS)
  const [roll, setRoll] = useState(null)

  function startRoll(nextCounts) {
    setRoll(rollSelection(nextCounts, { modifiers }))
  }

  function rollOne(sides) {
    const nextCounts = singleTypeCounts(sides)
    setCounts(nextCounts)
    setRoll(rollSelection(nextCounts, { modifiers }))
  }

  function rollSelected() {
    startRoll(counts)
  }

  function setCount(sides, count) {
    setCounts((current) => ({ ...current, [sides]: clampCount(count) }))
  }

  function resetCounts() {
    setCounts(EMPTY_COUNTS)
    setModifiers(EMPTY_MODIFIERS)
    setRoll(null)
  }

  function setModifier(sides, modifier) {
    setModifiers((current) => ({ ...current, [sides]: clampModifier(modifier) }))
  }

  return (
    <div className="app">
      <header className="masthead">
        <p className="eyebrow">Table dice</p>
        <h1>Dice Generator</h1>
        <p>Roll a D4, D6, D8, D10, D12, or D20. Add several of each and keep the totals.</p>
      </header>
      <main className="layout">
        <DiceTray
          counts={counts}
          modifiers={modifiers}
          roll={roll}
          onCount={setCount}
          onModifier={setModifier}
          onRollOne={rollOne}
          onRoll={rollSelected}
          onReset={resetCounts}
        />
      </main>
    </div>
  )
}