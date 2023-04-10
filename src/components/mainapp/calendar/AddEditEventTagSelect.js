import React from "react"

import CreatableSelect from "react-select/creatable"
import { DBCalendarServices } from "../../../services/db/DBCalendarServices"
import { SYSTEM_TAG } from "../../../util/systemTags"

export default function AddEditEventTagSelect(props) {
  const [options, setOptions] = React.useState([])

  React.useEffect(() => {
    DBCalendarServices.getAllTags().then((tags) => {
      setOptions(
        tags
          .filter((tag) => tag !== SYSTEM_TAG.IS_SESSION)
          .map((tag) => {
            return { value: tag, label: tag }
          })
      )
    })
  }, [])

  const [selectedOptions, setSelectedOptions] = React.useState([])

  React.useEffect(() => {
    setSelectedOptions(
      props.selectedOptionValuesList
        ? options.filter((o) =>
            props.selectedOptionValuesList.includes(o.value)
          )
        : []
    )
  }, options)

  function changeSelectedOptions(tagsObjectList) {
    setSelectedOptions(tagsObjectList)
    props?.onChange?.(tagsObjectList.map((tagObject) => tagObject.value))
  }

  return (
    <CreatableSelect
      isMulti
      isClearable
      placeholder="Add Tags"
      options={options}
      value={selectedOptions}
      onChange={changeSelectedOptions}
      menuPlacement="top"
    />
  )
}
