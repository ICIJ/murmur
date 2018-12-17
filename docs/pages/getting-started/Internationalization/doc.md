---
title: Internationalization
description: Translate your components
order: 30
---

### How it work

This library can be translated using [vue-i18n](https://github.com/kazupon/vue-i18n).
By default, we provide a series of locales in English for our components. The
translation library is installed at a component level. So each component using
translation received a `i18n` attribute.

### Adding more locales

This library expose a static method to add new locales:

```js
import Collection from 'icij-vue-collection'

Collection.setLocaleMessage('fr', {
  "imddb-header": {
    "navbar": {
      "leak": "Contact confidentiel",
      "support": "Soutenez nous",
      "follow": "Suivez l'ICIJ"
    }
  }
})
```

Then you can switch to a new language easily:

```js
Collection.setLocale('fr')
```

### Overiding locales

In the very same fashion, you can modify existing locales:

```js
import Collection from 'icij-vue-collection'

Collection.mergeLocaleMessage('en', {
  "imddb-header": {
    "navbar": {
      "leak": "SecureDrop",
      "support": "Buy us a beer 🍺",
      "follow": "Follow ICIJ"
    }
  }
})
```

### Default locales

Here are English locales defined in <repository-link path="lib/locales/en.json">lib/locales/en.json</repository-link>:

```
{{ en }}
```

<script>
  import en from '@/locales/en.json'
  
  /* import Collection from '@/main'

  Collection.mergeLocaleMessage('en', {
    "imddb-header": {
      "navbar": {
        "leak": "SecureDrop",
        "support": "Buy us a beer 🍺",
        "follow": "Follow ICIJ"
      }
    }
  }) */

  export default {
    data () {
      return {
        en
      }
    }
  }
</script>
