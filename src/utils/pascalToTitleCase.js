function pascalToTitleCase (pascalText) {
  const initialCap = pascalText.charAt(0).toUpperCase()
  const spacedOutSection = pascalText.slice(1).replace(/([A-Z])/g, ' $1')
  return (initialCap + spacedOutSection).trim()
}

module.exports = pascalToTitleCase
