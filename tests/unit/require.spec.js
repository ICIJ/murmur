import Dist from '../../dist/lib/@icij/murmur.umd.js'

describe('the library bundle', () => {

    it('should have a list of component', () => {
      expect(Dist.components).toHaveProperty('Brand')
      expect(Dist.components).toHaveProperty('ContentPlaceholder')
      expect(Dist.components).toHaveProperty('DonateForm')
      expect(Dist.components).toHaveProperty('EmbeddableFooter')
      expect(Dist.components).toHaveProperty('EmbedForm')
      expect(Dist.components).toHaveProperty('FollowUsPopover')
      expect(Dist.components).toHaveProperty('Fa')
      expect(Dist.components).toHaveProperty('GenericFooter')
      expect(Dist.components).toHaveProperty('GenericHeader')
      expect(Dist.components).toHaveProperty('ImddbHeader')
      expect(Dist.components).toHaveProperty('ResponsiveIframe')
      expect(Dist.components).toHaveProperty('SharingOptions')
      expect(Dist.components).toHaveProperty('SignUpForm')
      expect(Dist.components).toHaveProperty('SlideUpDown')
    })

})
