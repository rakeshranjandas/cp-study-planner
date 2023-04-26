import { DBCalendarServices } from "../db/DBCalendarServices"
import { systemTags, SYSTEM_TAG } from "../../util/systemTags"

export const TagsGetter = {
  forAddEventForm: async function () {
    return this._getTagsAddSystemTags([SYSTEM_TAG.IS_SESSION, SYSTEM_TAG.IS_SR])
  },

  forFilterField: async function () {
    return this._getTagsAddSystemTags([])
  },

  _getTagsAddSystemTags: async function (invalidTags) {
    return DBCalendarServices.getAllTags().then((tags) => {
      const tagSet = new Set(tags)

      systemTags
        .filter((sTag) => !invalidTags.includes(sTag))
        .forEach((sTag) => tagSet.add(sTag))

      invalidTags.forEach((iTag) => tagSet.delete(iTag))

      return Array.from(tagSet)
    })
  },
}
