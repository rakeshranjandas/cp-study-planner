import React from "react"

import Select from "react-select"
import { TagsGetter } from "../../../services/tags/TagsGetter"

export default function FilterByTagsBar(props) {
  const [options, setOptions] = React.useState([])

  React.useEffect(() => {
    TagsGetter.forFilterField().then((tags) => {
      setOptions(
        tags.map((tag) => {
          return { value: tag, label: tag }
        })
      )
    })
  }, [])

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
      placeholder="Show events with tags ..."
      onChange={changeSelectedOptions}
    />
  )
}
