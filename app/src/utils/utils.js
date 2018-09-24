import React from 'react'

function prepareDates (note) {
  const createdString = new Date(note.created).toLocaleString('hr-HR', { timeZone: 'Europe/Zagreb' })
  const updatedString = new Date(note.updated).toLocaleString('hr-HR', { timeZone: 'Europe/Zagreb' })
  const dueDateString = new Date(note.dueDate).toLocaleString('hr-HR', { timeZone: 'Europe/Zagreb' })
  const daysLeft = Math.floor((note.dueDate - Date.now()) / 86400000)
  const hoursLeft = Math.floor((note.dueDate - Date.now()) / 3600000)
  if (note.dueDate !== 0) {
    return (
      <small className='text-muted'>
        <strong>Created:</strong> {`${createdString} | `}
        <strong>Updated:</strong> {`${updatedString} | `}
        <strong>Due:</strong> {`${dueDateString} - `}
        {note.dueDate !== 0 && daysLeft > 0 ? <strong>{`${daysLeft} days left `}</strong> : <strong>{`${hoursLeft} hours left `}</strong>}
      </small>
    )
  } else {
    return (
      <small className='text-muted'>
        <strong>Created:</strong> {`${createdString} | `}
        <strong>Updated:</strong> {`${updatedString}`}
      </small>
    )
  }
}

function cardClass (note) {
  const daysLeft = Math.floor((note.dueDate - Date.now()) / 86400000)
  if (daysLeft > 0 && daysLeft <= 3) {
    return 'card bg-red'
  }
  if (daysLeft > 0 && daysLeft <= 7) {
    return 'card bg-yellow'
  }
  if (daysLeft > 7) {
    return 'card bg-green'
  }
  return 'card bg-blue'
}

export { prepareDates, cardClass }
