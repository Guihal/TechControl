import '../scss/main.scss'
import { elementReady } from './utils/elementReady'

async function hidePaymentMethod() {
    const cart = await elementReady('[data-record-type="706"]')

    const callback = cart.matches('.uc-testcart') ? hideAndClickPaymentMethod : removePaymentMethod

    callback()

    const observer = new MutationObserver(callback)

    observer.observe(cart, { childList: true, subtree: true })

    async function hideAndClickPaymentMethod() {
        const paymentContainer = cart.querySelector('.t-input-group_pm')

        if (!paymentContainer) return
        if (paymentContainer.matches('.hidden')) return

        paymentContainer.classList.add('hidden')
        const paymentMethod = paymentContainer.querySelector('[data-payment-variant-system="banktransfer"]')
        paymentMethod.parentNode.click()
    }

    function removePaymentMethod() {
        const paymentMethod = cart.querySelector('[data-payment-variant-system="banktransfer"]')
        if (!paymentMethod) return
        paymentMethod.parentNode.remove()
    }
}

hidePaymentMethod()
