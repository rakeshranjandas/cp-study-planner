import React from "react"

import CreatableSelect from "react-select/creatable"
import { DBCalendarServices } from "../../../services/db/DBCalendarServices"
import { SYSTEM_TAG } from "../../../util/systemTags"

export default function AddEditEventTagSelect(props) {
  const [options, setOptions] = React.useState([])
  const [selectedOptions, setSelectedOptions] = React.useState([])

  React.useEffect(() => {
    DBCalendarServices.getAllTags().then((tags) => {
      const showTags = tags
        .filter((tag) => tag !== SYSTEM_TAG.IS_SESSION)
        .map((tag) => {
          return { value: tag, label: tag }
        })

      const selectedTags = props.selectedOptionValuesList
        ? showTags.filter((o) =>
            props.selectedOptionValuesList.includes(o.value)
          )
        : []

      if (props.selectedOptionValuesList?.includes(SYSTEM_TAG.IS_SESSION)) {
        const isSessionTag = {
          value: SYSTEM_TAG.IS_SESSION,
          label: SYSTEM_TAG.IS_SESSION,
        }

        showTags.push(isSessionTag)
        selectedTags.push(isSessionTag)
      }

      setSelectedOptions(selectedTags)
      setOptions(showTags)
    })
  }, [])

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
