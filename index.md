#JS
//variáveis
const msg = "Hello!"
//tipos de dados
  //number
  //string
//funções
alert(msg)


//objeto javascript
const participante = {
  nome: "Gustavo dos Santos",
  email: "gustas22@gmail.com",
  dataInscricao: new Date(2024, 2, 1, 20),
  dataCheckIn: new Date(2024, 2, 2, 22)
}


//array
let participantes = [
  {
    nome: "Gustavo dos Santos",
    email: "gustas22@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 20),
    dataCheckIn: new Date(2024, 2, 2, 22)
  },
]


// estrutura de repetição - loop
for(let participante of participantes) {
  // faça alguma coisa aqui
  // enquanto tiver participantes nessa lista
  //exemplo:
  output = output + criarNovoParticipante(participante)
}
```
 ------------------------------------------------------------------------------
REVISÃO
 ------------------------------------------------------------------------------
const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)
  
  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
     <button
       data-email="${participante.email}"
       onclick="fazerCheckIn(event)"
     >
       Confirmar check-in
     </button>
    `
  }

  return `
  <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  // substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscrição: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante já existe 
  const participanteExiste = participante.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulario 
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return 
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}