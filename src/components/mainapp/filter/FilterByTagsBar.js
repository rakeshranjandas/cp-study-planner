import React from "react"

import Select from "react-select"
import { DBCalendarServices } from "../../../services/db/DBCalendarServices"

export default function FilterByTagsBar(props) {
  const options = React.useMemo(() => {
    return DBCalendarServices.getAllTags().map((tag) => {
      return { value: tag, label: tag }
    })
  })

  const [selectedOptions, setSelectedOptions] = React.useState([])

  function changeSelectedOptions(tagsObjectList) {
    setSelectedOptions(tagsObjectList)
    props?.onChange?.(tagsObjectList.map((tagObject) => tagObject.value))
  }

  return (
    <Select
      isMulti
      name="colors"
      options={options}
      placeholder="Search by tags..."
      onChange={changeSelectedOptions}
    />
  )
}
