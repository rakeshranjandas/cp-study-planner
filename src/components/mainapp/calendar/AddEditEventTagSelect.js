import React from "react"

import CreatableSelect from "react-select/creatable"
import { TagsGetter } from "../../../services/tags/TagsGetter"

export default function AddEditEventTagSelect(props) {
  const [options, setOptions] = React.useState([])
  const [selectedOptions, setSelectedOptions] = React.useState([])

  React.useEffect(() => {
    TagsGetter.forAddEventForm().then((tags) => {
      const selectedTags = props.selectedOptionValuesList ?? []

      const tagSet = new Set(tags)
      selectedTags.forEach((selectedTag) => tagSet.add(selectedTag))
      const showTags = Array.from(tagSet)

      const _withValueAndLabel = (tags) =>
        tags.map((t) => {
          return {
            value: t,
            label: t,
          }
        })

      setOptions(_withValueAndLabel(showTags))
      setSelectedOptions(_withValueAndLabel(selectedTags))
    })
  }, [props.selectedOptionValuesList])

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
