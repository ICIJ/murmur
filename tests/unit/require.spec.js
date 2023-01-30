import Murmur from '@root/main'

describe('the library bundle', () => {

    it('should have a list of component', () => {
      expect(Murmur.components).toHaveProperty('Brand')
      expect(Murmur.components).toHaveProperty('ContentPlaceholder')
      expect(Murmur.components).toHaveProperty('DonateForm')
      expect(Murmur.components).toHaveProperty('EmbeddableFooter')
      expect(Murmur.components).toHaveProperty('EmbedForm')
      expect(Murmur.components).toHaveProperty('FollowUsPopover')
      expect(Murmur.components).toHaveProperty('Fa')
      expect(Murmur.components).toHaveProperty('GenericFooter')
      expect(Murmur.components).toHaveProperty('GenericHeader')
      expect(Murmur.components).toHaveProperty('ImddbHeader')
      expect(Murmur.components).toHaveProperty('ResponsiveIframe')
      expect(Murmur.components).toHaveProperty('SharingOptions')
      expect(Murmur.components).toHaveProperty('SignUpForm')
      expect(Murmur.components).toHaveProperty('SlideUpDown')
    })

})
