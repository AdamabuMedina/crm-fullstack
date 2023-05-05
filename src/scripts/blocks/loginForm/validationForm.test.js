import { validationForm } from "./validationForm"
describe("validationForm", () => {
  let form

  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <input type="text" name="login" class="login-form__input--login" />
        <input type="password" name="password" class="login-form__input--password" />
      </form>
    `
    form = document.querySelector("form")
  })

  afterEach(() => {
    document.body.innerHTML = ""
  })

  it("should initialize JustValidate with correct parameters", () => {
    const validation = validationForm(form)

    expect(validation).toBeInstanceOf(JustValidate)
    expect(validation.options.errorLabelStyle).toEqual({})
    expect(validation.options.errorLabelCssClass).toEqual(
      "login-form__label-text--invalid"
    )
    expect(validation.options.errorFieldCssClass).toEqual(
      "login-form__input--invalid"
    )
  })

  it("should add fields to validation object", () => {
    const validation = validationForm(form)

    expect(validation.fields).toHaveProperty(".login-form__input--login")
    expect(validation.fields).toHaveProperty(".login-form__input--password")
    expect(validation.fields[".login-form__input--login"][0].rule).toEqual(
      "required"
    )
    expect(validation.fields[".login-form__input--login"][1].rule).toEqual(
      "customRegexp"
    )
    expect(validation.fields[".login-form__input--login"][2].rule).toEqual(
      "minLength"
    )
    expect(validation.fields[".login-form__input--password"][0].rule).toEqual(
      "required"
    )
    expect(validation.fields[".login-form__input--password"][1].rule).toEqual(
      "customRegexp"
    )
    expect(validation.fields[".login-form__input--password"][2].rule).toEqual(
      "minLength"
    )
  })

  it("should call onSuccess callback on form submit", () => {
    const onSuccess = jest.fn()
    const validation = validationForm(form)
    validation.onSuccess = onSuccess

    const submitEvent = new Event("submit")
    form.dispatchEvent(submitEvent)

    expect(onSuccess).toHaveBeenCalled()
  })
})
