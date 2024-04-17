const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const app = {
    declare() {
        const BankAccountInput = $("input[name='BankAccount']")
        const DebounceInput = $("input[name='Debounce']")
        const BtnSubmit = $('.BtnSubmit')
        const BankAccountError = $('#BankAccountError')
        const DebounceError = $('#DebounceError')
        return { BankAccountInput, DebounceInput, BtnSubmit, BankAccountError, DebounceError }
    },

    loading() {
        const src = 'loadding.gif'
        return (
            `<img 
            class='Image'
            src='${ src }'/>`
        )
    },

    render(src) {
        const currentURL = window.location.href
        return (
            `
            <a 
            class="BtnBack" href="${ currentURL }"><i class="fa-solid fa-caret-left"></i> <span> QUAY LẠI</span></a>
            <img 
            class='Image'
            src='${ src }'/>
            `
        )
    }, 

    handle() {
        const { BankAccountInput, DebounceInput, BtnSubmit, BankAccountError, DebounceError } = this.declare()
        const qrContainer = $('article')

        function CheckInputValue(inputElement, errorElement, has = "yes") 
        {
            if (!inputElement.value) 
            {
                errorElement.innerHTML = "<i class='fa-solid fa-circle-exclamation'></i> Vui lòng nhập giá trị."
                return false
            } else if (has === "yes" && inputElement.value.length < 10) 
            {
                errorElement.innerHTML = "<i class='fa-solid fa-circle-exclamation'></i> Vui lòng nhập STK hợp lệ."
                return false
            } else 
            {
                errorElement.innerHTML = ""
                return true
            }
        }

        function UpdateSubmitButton() {
            if (CheckInputValue(BankAccountInput, BankAccountError) && CheckInputValue(DebounceInput, DebounceError, "no")) 
            {
                BtnSubmit.disabled = false
            } else {
                BtnSubmit.disabled = true
            }
        }

        BankAccountInput.onblur = () => {
            UpdateSubmitButton()
        }
    
        DebounceInput.onblur = () => {
            UpdateSubmitButton()
        }

        BtnSubmit.onclick = () => {
            qrContainer.innerHTML = this.loading()
            const BankAccount = BankAccountInput.value
            const Debounce = DebounceInput.value

            setTimeout(() => {
                const url = `https://qr.ecaptcha.vn/api/generate/mb/${ BankAccount }/VIETQR.CC?amount=${ Debounce }&memo=DH0101&is_mask=0&bg=7`
                console.log(url)
                try {
                    qrContainer.innerHTML = this.render(url)
                } 
                catch (err) { console.log(err) }
            }, 1000)
        }
    },
}

app.handle()
