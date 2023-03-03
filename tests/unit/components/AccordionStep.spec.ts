import {mount, shallowMount} from "@vue/test-utils";
import {BButton} from 'bootstrap-vue'
import AccordionStep from "@/components/AccordionStep.vue";
import {AccordionKey} from "@/keys";

import Vue from 'vue'

import type {Accordion, AccordionProvide} from "@/types";

describe('AccordionStep', () => {
    // Stubs Bootstrap Vue components
    const stubs = ['b-card', 'b-collapse']
    const step = Symbol("step")
    const steps = [step, Symbol("step2")]

    let provide: AccordionProvide
    let mockAccordion: vi.Mocked<Accordion>

    beforeAll(() => {
        Vue.component('b-button', BButton)
        mockAccordion = {
            step,
            steps,
            isActiveStep: vi.fn(),
            isPreviousStep: vi.fn(),
            isFirstStep: vi.fn(),
            isLastStep: vi.fn(),
            emitAccordionPreviousStepEvent: vi.fn(),
            emitAccordionNextStepEvent: vi.fn()
        }
        provide = {
            [AccordionKey]: mockAccordion
        }
    })
    beforeEach(() => {
        mockAccordion.isActiveStep.mockClear()
        mockAccordion.isPreviousStep.mockClear()
        mockAccordion.isFirstStep.mockClear()
        mockAccordion.isLastStep.mockClear()
        mockAccordion.emitAccordionPreviousStepEvent.mockClear()
        mockAccordion.emitAccordionNextStepEvent.mockClear()
    })

    describe('should display a title ', () => {
        it('using title property', () => {
            const propsData = {step, title: 'Titre'}
            let wrapper = shallowMount(AccordionStep, {propsData, provide, stubs})
            const element = wrapper.find(".accordion-wrapper__content__step__heading")
            expect(element.text()).toBe('Titre')

        })
        it('using slot named title', () => {
            const propsData = {step}
            let wrapper = shallowMount(AccordionStep, {
                propsData, provide, stubs, slots: {
                    title: {template: '<div>Titre test</div>'}
                }
            })
            const element = wrapper.find(".accordion-wrapper__content__step__heading")
            expect(element.text()).toBe('Titre test')

        })
    })
    describe('should display a content ', () => {
        it('using content property', () => {
            const propsData = {step, content: 'content to show'}
            let wrapper = shallowMount(AccordionStep, {propsData, provide, stubs})
            const element = wrapper.find(".accordion-wrapper__content__step__main")
            expect(element.text()).toBe('content to show')

        })
        it('using slot named content', () => {
            const propsData = {step}
            let wrapper = shallowMount(AccordionStep, {
                propsData, provide, stubs, slots: {
                    content: {template: '<div>content to show in slot</div>'}
                }
            })
            const element = wrapper.find(".accordion-wrapper__content__step__main")
            expect(element.text()).toBe('content to show in slot')
        })
    })
    describe('display status class', () => {
        describe('when the step is active', () => {

            it('should have the class --active', async () => {
                mockAccordion.isActiveStep.mockReturnValueOnce(false)
                const propsData = {step}
                let wrapper = mount(AccordionStep, {propsData, provide, stubs})

                const notActiveElement = wrapper.find('.accordion-wrapper__content__step--active')
                expect(notActiveElement.exists()).toBeFalsy()

                mockAccordion.isActiveStep.mockReturnValueOnce(true)
                wrapper = mount(AccordionStep, {propsData, provide, stubs})
                const activeElement = wrapper.find('.accordion-wrapper__content__step--active')
                expect(activeElement.exists()).toBeTruthy()
            })
            it('the content should be visible', async () => {
                mockAccordion.isActiveStep.mockReturnValueOnce(false)
                const propsData = {step}
                let wrapper = mount(AccordionStep, {propsData, provide, stubs})

                const notActiveElement = wrapper.find('.accordion-wrapper__content__step b-collapse-stub')
                expect(notActiveElement.attributes().visible).toBe(undefined)

                mockAccordion.isActiveStep.mockReturnValueOnce(true)
                wrapper = mount(AccordionStep, {propsData, provide, stubs})
                const activeElement = wrapper.find('.accordion-wrapper__content__step b-collapse-stub')
                expect(activeElement.attributes().visible).toBe("true")
            })

        })

        it('when the step is the previous one', async () => {
            mockAccordion.isPreviousStep.mockReturnValueOnce(false)
            const propsData = {step}
            let wrapper = mount(AccordionStep, {propsData, provide, stubs})

            const notActiveElement = wrapper.find('.accordion-wrapper__content__step--previous')
            expect(notActiveElement.exists()).toBeFalsy()

            mockAccordion.isPreviousStep.mockReturnValueOnce(true)
            wrapper = mount(AccordionStep, {propsData, provide, stubs})
            const activeElement = wrapper.find('.accordion-wrapper__content__step--previous')
            expect(activeElement.exists()).toBeTruthy()
        })
    })

    describe('action buttons', () => {
        it('displays a back button', async () => {
            const propsData = {step}
            let wrapper = shallowMount(AccordionStep, {propsData, provide, stubs})
            const element = wrapper.find('.accordion-wrapper__content__step__back-button')
            expect(element.exists()).toBeTruthy()
            element.trigger('click')
            expect(wrapper.emitted()).toHaveProperty('previous-step')
        })

        it('displays a next button', async () => {
            const propsData = {step}
            let wrapper = mount(AccordionStep, {propsData, provide, stubs})
            const element = wrapper.find('.accordion-wrapper__content__step__continue-button')
            expect(element.exists()).toBeTruthy()
            element.trigger('click')
            expect(wrapper.emitted()).toHaveProperty('next-step')
        })
    })
})