let participantes = [
 {
  nome: "Gustavo Santos",
  email: "gustas22@gmail.com", 
  dataInscricao: new Date(2024, 2, 01, 19, 23),
  dataCheckIn: new Date(2024, 2, 02,20,10)
 },
 {
  nome: "Erislan  Morais",
  email: "laudnobru@gmail.com", 
  dataInscricao: new Date(2024, 0, 01, 18, 27),
  dataCheckIn: null
 },
 {
  nome: "Maria Silva",
  email: "maria.silva@example.com", 
  dataInscricao: new Date(2024, 1, 15, 14, 45),
  dataCheckIn: new Date(2024, 2, 01, 10, 30)
 },
 {
  nome: "João Souza",
  email: "joao.souza@example.com", 
  dataInscricao: new Date(2024, 1, 20, 11, 10),
  dataCheckIn: null
 },
 {
  nome: "Ana Oliveira",
  email: "ana.oliveira@example.com", 
  dataInscricao: new Date(2024, 1, 25, 9, 30),
  dataCheckIn: new Date(2024, 2, 02, 15, 20)
 },
 {
  nome: "Pedro Rodrigues",
  email: "pedro.rodrigues@example.com", 
  dataInscricao: new Date(2024, 2, 05, 17, 50),
  dataCheckIn: new Date(2024, 2, 06, 8, 45)
 },
 {
  nome: "Carla Costa",
  email: "carla.costa@example.com", 
  dataInscricao: new Date(2024, 2, 10, 8, 15),
  dataCheckIn: null
 },
 {
  nome: "Rafaela Pereira",
  email: "rafaela.pereira@example.com", 
  dataInscricao: new Date(2024, 2, 15, 12, 40),
  dataCheckIn: new Date(2024, 2, 16, 14, 20)
 },
 {
  nome: "Lucas Martins",
  email: "lucas.martins@example.com", 
  dataInscricao: new Date(2024, 2, 20, 16, 5),
  dataCheckIn: new Date(2024, 2, 21, 10, 50)
 },
 {
  nome: "Mariana Lima",
  email: "mariana.lima@example.com", 
  dataInscricao: new Date(2024, 2, 25, 9, 20),
  dataCheckIn: null
 }
];

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
    dataInscricao: new Date(),
    dataCheckIn: null  
  }

  // verificar se o particpante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
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