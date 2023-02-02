const dateConverter = (date) => {
  date = date.split('-').reverse()
  date = date[0] + date[1] + date[2].slice(2)
  return date
}

export default dateConverter