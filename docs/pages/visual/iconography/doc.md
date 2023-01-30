### FontAwesome

This library heavily relies on [Font Awesome](https://fontawesome.com/) to display icons.
As they state on their website "Font Awesome gives you scalable vector icons that
can instantly be customized — size, color, drop shadow, and anything that can be
done with the power of CSS".

All available icons [can be found here](https://fontawesome.com/icons?d=gallery&m=free).

### Adding icons to the library

Since all icons are not imported automaticly, you must indicate which icons are
available in your application. This documentation, like any application using this
package, has its own subset of icons:

<ul class="list-inline">
  <li v-for="icon, i in fas" :key="`fas-${i}`" class="p-1 text-primary list-inline-item mb-2">
    <fa :icon="icon" fixed-width size="2x" />
  </li>  
  <li v-for="icon, i in fab" :key="`fab-${i}`" class="p-1 text-primary list-inline-item mb-2">
    <fa :icon="['fab', icon]" fixed-width size="2x" />
  </li>
</ul>

This way, your application stays small and doesn't load unecessary icon — especialy
if it only uses components that require only a few icons. Because icons are lazy
loaded, you might see this list grow while visiting other components. These icons
are added using the following method:

```js
// Target the icon you need to add to your library
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
// Import the library instance provided by FontAwesome
import { library } from '@icij/murmur/lib/components/Fa'

// And add the bars to the library
library.add(faBars)
```

You can now use the `bars` icon in you templates using the Fa component:

```html
<fa icon="bars" />
```

<script>
  import { get, uniqBy } from 'lodash'
  import { library } from '@root/components/Fa'

  export default {
    computed: {
      fas () {
        return uniqBy(Object.keys(library.definitions.fas || {}), key => {
          return get(library.definitions.fas, [key, 2])
        })
      },      
      fab () {
        return uniqBy(Object.keys(library.definitions.fab || {}), key => {
          return get(library.definitions.fab, [key, 2])
        })
      }
    }
  }
</script>
