import { addCollection } from '@iconify/vue'
import simpleIcons from '@iconify-json/simple-icons/icons.json'

const DOWNLOAD_ICON_BODY = '<path fill="currentColor" d="M12 2a1 1 0 0 1 1 1v8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L11 11.586V3a1 1 0 0 1 1-1m-7 14a1 1 0 0 1 1 1v1h12v-1a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1"/>'

let iconCollectionsRegistered = false

export function ensureLocalIconCollections() {
  if (iconCollectionsRegistered) return

  addCollection(simpleIcons)
  addCollection({
    prefix: 'provider',
    icons: {
      download: {
        body: DOWNLOAD_ICON_BODY,
        width: 24,
        height: 24
      },
      baidu: simpleIcons.icons.baidu,
      googledrive: simpleIcons.icons.googledrive,
      mega: simpleIcons.icons.mega,
      onedrive: simpleIcons.icons.microsoftonedrive,
      github: simpleIcons.icons.github,
      icloud: simpleIcons.icons.icloud
    },
    width: 24,
    height: 24
  })

  iconCollectionsRegistered = true
}
