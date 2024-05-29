const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.getElementById('input')
const resultInput = document.getElementById('result')

//array de teclar permitidas
const teclasPermitidas = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

//função para adicionar as teclas clicadas no html
document.querySelectorAll('.charKey').forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener('click', function () {
    const valueData = charKeyBtn.dataset.value
    input.value += valueData
  })
})

//funcionalidade para apagar 
document.getElementById('clear').addEventListener('click', function () {
  input.value = ' ';
  input.focus()
})

//usando o evento keydown para pegar a tecla apertada
input.addEventListener('keydown', function (ev) {
  ev.preventDefault()

  //se a tecla estiver no array será adicionada ao input 
  if(teclasPermitidas.includes(ev.key)) {
    input.value += ev.key
    return
    }
    //tecla para apagar caracteres do campo (de trás para frente)
    if(ev.key === 'Backspace') {
      input.value = input.value.slice(0, -1)
    }
    //tecla enter com a função de calcular 
    if(ev.key === 'Enter') {
      calcular()
    }
})


//ação no botão igual para chamar a função calcular
document.getElementById('equal').addEventListener('click' , calcular)

function calcular() {
  resultInput.value = 'ERROR'
  resultInput.classList.add('error')
  
  const result = eval(input.value)

  resultInput.value = result
  resultInput.classList.remove('error')
}

//botão copiar 
document.getElementById('copyToClipboard').addEventListener('click', function (ev) {
  const button = ev.currentTarget
  if(button.innerText === 'Copy') {
    button.innerText = 'Copied!'
    button.classList.add('success')
    navigator.clipboard.writeText(resultInput.value)
  } else {
    button.innerText = 'Copied!'
    button.classList.remove('success')
  }
})

//mudando o tema 
document.getElementById('themeSwitcher').addEventListener('click', function () {
  if(main.dataset.theme === 'dark') {
    root.style.setProperty('--bg-color', '#f1f5f9')
    root.style.setProperty('--border-color', '#aaa')
    root.style.setProperty('--font-color', '#212529')
    root.style.setProperty('--primary-color', '#26834a')
    main.dataset.theme = 'light'
  } else {
    root.style.setProperty('--bg-color', '#212529')
    root.style.setProperty('--border-color', '#666')
    root.style.setProperty('--font-color', '#f1f5f9')
    root.style.setProperty('--primary-color', '#4dff91')
    main.dataset.theme = 'dark'
  }
})