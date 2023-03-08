// Source: https://stackoverflow.com/a/56370447/2195730

const separator = ','

// Note: Doing to avoid actions columns being exported (assumption last column would be action)
const excludeLastColumnIndex = 1

export const exportTableToCsv = (filename: string) => {
  const rows = document.querySelectorAll('table tr')

  const csv = []
  for (const i of rows) {
    const row = []
    const cols = i.querySelectorAll('td, th')
    for (let j = 0; j < cols.length - excludeLastColumnIndex; j++) {
      // @ts-expect-error will revist
      let data = cols[j].innerText
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(/(\s\s)/gm, ' ')
      data = data.replace(/"/g, '""')
      row.push('"' + data + '"')
    }
    csv.push(row.join(separator))
  }
  const csvStr = csv.join('\n')
  const link = document.createElement('a')
  link.style.display = 'none'
  link.setAttribute('target', '_blank')
  link.setAttribute(
    'href',
    'data:text/csv;charset=utf-8,' + encodeURIComponent(csvStr)
  )
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
