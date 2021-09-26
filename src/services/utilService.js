export default {
  makeId,
}

function makeId() {
  return Math.random().toString(16).slice(2)
}
