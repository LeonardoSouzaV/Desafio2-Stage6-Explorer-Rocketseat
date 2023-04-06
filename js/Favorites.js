import { GithubUser } from "./GithubUser.js"

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  checkIfHaveAUser() {
    if (this.entries.length === 0) {
      document.querySelector(".table-without-favorites").style.display = ""
    } else {
      document.querySelector(".table-without-favorites").style.display = "none"
    }
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem("@github-favorites:")) || []
  }

  save() {
    localStorage.setItem("@github-favorites:", JSON.stringify(this.entries))
  }
  async add(username) {
    try {
      const userExists = this.entries.find(
        (entry) => entry.login.toUpperCase() === username.toUpperCase()
      )
      if (userExists) {
        throw new Error("This user is already registered in your favorites!")
      }

      const user = await GithubUser.search(username)
      if (user.login === undefined) {
        throw new Error("User not found!")
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()
    } catch (error) {
      alert(error.message)
    }
  }
  delete(user) {
    const filteredEntries = this.entries.filter(
      (entry) => entry.login !== user.login
    )
    this.entries = filteredEntries
    this.update()
    this.save()
    this.checkIfHaveAUser()
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector("table tbody")

    this.update()
    this.onadd()
  }

  onadd() {
    const addButton = this.root.querySelector(".search button")
    addButton.onclick = () => {
      const { value } = this.root.querySelector(".search input")

      this.add(value)
    }
  }

  update() {
    this.removeAllTr()

    this.entries.forEach((user) => {
      const row = this.createRow()

      row.querySelector(
        ".user img"
      ).src = `https://github.com/${user.login}.png`
      row.querySelector(".user img").alt = `Imagem de ${user.name}`
      row.querySelector(".user a").href = `https://github.com/${user.login}`
      row.querySelector(".user p").textContent = user.name
      row.querySelector(".user span").textContent = user.login
      row.querySelector(".repositories").textContent = user.public_repos
      row.querySelector(".followers").textContent = user.followers

      row.querySelector(".remove").onclick = () => {
        const isOk = confirm("Are you sure you want to delete this favorite?")
        if (isOk) {
          this.delete(user)
        }
      }
      this.tbody.append(row)
      this.checkIfHaveAUser()
    })
  }

  createRow() {
    const tr = document.createElement("tr")

    tr.innerHTML = ` <td class="user">
                <img
                  src="https://github.com/diego3g.png"
                  alt="Foto do usuário do github"
                />

                <a href="https://github.com/diego3g" target="_blank">
                  <p>Diego Fernandes</p>
                  /<span>diego3g</span>
                </a>
              </td>
              <td class="repositories">16</td>
              <td class="followers">2</td>
              <td class="for-border"><button class="remove">Remove</button></td>
              `
    return tr
  }

  removeAllTr() {
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove()
    })
  }
}
