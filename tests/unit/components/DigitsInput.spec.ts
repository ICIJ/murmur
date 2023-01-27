import { shallowMount, Wrapper } from "@vue/test-utils"
import DigitsInput from "@/components/DigitsInput.vue"

const createContainer = (tag = 'div') => {
  const container = document.createElement(tag)
  document.body.appendChild(container)
  return container
}

describe('DigitsInput', () => {

  describe('an instance of 4 digits without initial value', () => {

    let wrapper: Wrapper<any>


    beforeEach(() => {
      const propsData = { length: 4 }
      const attachTo = createContainer()
      wrapper = shallowMount(DigitsInput as any, { propsData, attachTo })
    })

    it('should have 4inputs', () => {
      expect(wrapper.emitted('input')).toBeFalsy()
    })

    it('should not trigger input event yet', () => {
      expect(wrapper.findAll('input')).toHaveLength(4)
    })

    it('should trigger input event when changing the first input', async () => {
      await wrapper.findAll('input').at(0).setValue('2')
      expect(wrapper.emitted('input')).toBeTruthy()
      expect(wrapper.emitted('input')).toHaveLength(1)
      expect(wrapper.emitted('input')?.shift()).toEqual(['2'])
    })

    it('should trigger input event when changing the second input', async () => {
      await wrapper.findAll('input').at(1).setValue('0')
      expect(wrapper.emitted('input')).toBeTruthy()
      expect(wrapper.emitted('input')).toHaveLength(1)
      expect(wrapper.emitted('input')?.shift()).toEqual(['0'])
    })

    it('should trigger input event when changing the third input', async () => {
      await wrapper.findAll('input').at(2).setValue('4')
      expect(wrapper.emitted('input')).toBeTruthy()
      expect(wrapper.emitted('input')).toHaveLength(1)
      expect(wrapper.emitted('input')?.shift()).toEqual(['4'])
    })

    it('should trigger input event when changing the fourth input', async () => {
      await wrapper.findAll('input').at(3).setValue('8')
      expect(wrapper.emitted('input')).toBeTruthy()
      expect(wrapper.emitted('input')).toHaveLength(1)
      expect(wrapper.emitted('input')?.shift()).toEqual(['8'])
    })

    it('should trigger input even with multiple digits on the first input', async () => {
      await wrapper.findAll('input').at(0).setValue('2048')
      expect(wrapper.emitted('input')).toBeTruthy()
      expect(wrapper.emitted('input')).toHaveLength(1)
      expect(wrapper.emitted('input')?.shift()).toEqual(['2048'])
    })

    it('should trigger input even with multiple digits on the first input and truncate to length', async () => {
      await wrapper.findAll('input').at(0).setValue('20489')
      expect(wrapper.emitted('input')).toBeTruthy()
      expect(wrapper.emitted('input')).toHaveLength(1)
      expect(wrapper.emitted('input')?.shift()).toEqual(['2048'])
    })

    it('should spread multiple values in the first input to the next inputs', async () => {
      await wrapper.findAll('input').at(0).setValue('2048')
      expect((wrapper.findAll('input').at(0).element as HTMLInputElement).value).toBe('2')
      expect((wrapper.findAll('input').at(1).element as HTMLInputElement).value).toBe('0')
      expect((wrapper.findAll('input').at(2).element as HTMLInputElement).value).toBe('4')
      expect((wrapper.findAll('input').at(3).element as HTMLInputElement).value).toBe('8')
    })

    it('should spread multiple values in the second input to the next inputs', async () => {
      await wrapper.findAll('input').at(1).setValue('204')
      expect((wrapper.findAll('input').at(0).element as HTMLInputElement).value).toBe('')
      expect((wrapper.findAll('input').at(1).element as HTMLInputElement).value).toBe('2')
      expect((wrapper.findAll('input').at(2).element as HTMLInputElement).value).toBe('0')
      expect((wrapper.findAll('input').at(3).element as HTMLInputElement).value).toBe('4')
    })

    it('should focus to the second input when completing the first with 1 digit', async () => {
      await wrapper.findAll('input').at(1).setValue('2')
      const secondInput = wrapper.findAll('input').at(1).element as HTMLInputElement
      expect(secondInput).toBe(document.activeElement)
    })

    it('should focus to the third input when completing the first with 2 digits', async () => {
      await wrapper.findAll('input').at(1).setValue('20')
      const thirdInput = wrapper.findAll('input').at(2).element as HTMLInputElement
      expect(thirdInput).toBe(document.activeElement)
    })

    it('should focus to the fourth input when completing the first with 10 digits', async () => {
      await wrapper.findAll('input').at(1).setValue('1234567890')
      const fourthInput = wrapper.findAll('input').at(3).element as HTMLInputElement
      expect(fourthInput).toBe(document.activeElement)
    })

    it('should focus to the previous input when hitting "delete" on the last', async () => {
      await wrapper.findAll('input').at(0).setValue('2048')
      await wrapper.findAll('input').at(3).setValue('')
      await wrapper.findAll('input').at(3).trigger('keyup.delete')
      const thirdInput = wrapper.findAll('input').at(2).element as HTMLInputElement
      expect(thirdInput).toBe(document.activeElement)
    })
  })
})