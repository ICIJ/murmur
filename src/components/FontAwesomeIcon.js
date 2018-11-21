import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
export { library } from '@fortawesome/fontawesome-svg-core'

export default FontAwesomeIcon
// Kicks off the process of finding <i> tags and replacing with <svg>
dom.watch()
