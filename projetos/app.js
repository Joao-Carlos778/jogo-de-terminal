import { salasMansao } from "./src/salas/mansao.js";
import { ESTADO } from "./src/estado.js";
import { createInterface } from "node:readline/promises";
import chalk from "chalk";


// Cria uma interface de leitura para o terminal
const term = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Salas do jogo
const salas = {
  ...salasMansao,
}; 

let { salaAtual } = ESTADO;

// Loop principal do jogo, onde o jogo acontece
while (true) {
  // 1. Mostrar a descrição da sala atual
  const sala = salasMansao[salaAtual];
  if (!sala) {
    console.log(chalk.red("Caiu para fora do mundo!"));
    break;
  }

  console.log();
  sala.descricao();
  for (const chave in sala.conexoes) {
    console.log(chalk.blue("-", chave));
  }

  // 2. Esperar o comando para o jogador
  const comando = await term.question(chalk.cyan("> "));
  if (!comando) {
    break;
  }

  const destinoFn = sala.conexoes[comando];
  if (destinoFn) {
    const destino = await destinoFn();
    if (destino) {
      salaAtual = destino;
    }
  } else {
    console.log(chalk.red("Não pode ir para lá"));
  }
}

console.log(chalk.green("Fim!"));
term.close();
