import React from "react"

import CreatableSelect from "react-select/creatable"
import { DBCalendarServices } from "../../../services/db/DBCalendarServices"

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ]

// const selectedOptionValue = ["chocolate", "strawberry"]

export default function AddEditEventTagSelect(props) {
  const options = React.useMemo(() => {
    return DBCalendarServices.getAllTags().map((tag) => {
      return { value: tag, label: tag }
    })
  })

  const [selectedOptions, setSelectedOptions] = React.useState(
    props.selectedOptionValuesList
      ? options.filter((o) => props.selectedOptionValuesList.includes(o.value))
      : []
  )

  function changeSelectedOptions(tagsObjectList) {
    setSelectedOptions(tagsObjectList)
    props.onChange(tagsObjectList.map((tagObject) => tagObject.value))
  }

  return (
    <CreatableSelect
      isMulti
      isClearable
      placeholder="Add Tags"
      options={options}
      value={selectedOptions}
      onChange={changeSelectedOptions}
    />
  )
}
