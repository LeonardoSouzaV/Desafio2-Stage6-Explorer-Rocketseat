export const AlertErrorUserAlredyExists = {
  element: document.querySelector(".alert-error-user-exists"),
  open() {
    AlertErrorUserAlredyExists.element.classList.add("open")
  },
  close() {
    AlertErrorUserAlredyExists.element.classList.remove("open")
  },
}

export const AlertErrorUserNotFound = {
  element: document.querySelector(".alert-error-user-not-found"),
  open() {
    AlertErrorUserNotFound.element.classList.add("open")
  },
  close() {
    AlertErrorUserNotFound.element.classList.remove("open")
  },
}

