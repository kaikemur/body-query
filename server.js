// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";
import dados from "./src/data/dados.js";

const { bruxos,varinhas,casas,pocoes} = dados;

// Criar aplicação com Express e configurar para aceitar JSON
const app = express();
app.use(express.json());

// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal GET para "/"
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});


// Aqui vão todas suas Rotas

// Query Parameters bruxo com filtro no Node.js - API de Hogwarts
app.get('/bruxos', (req, res) => {
    const { casa, ano, especialidade, nome ,vivo} = req.query;
    let resultado = bruxos;
  
    if (casa) {
      resultado = resultado.filter(b => b.casa.toLowerCase() === casa.toLowerCase());
    }
  
    if (ano) {
      resultado = resultado.filter(b => b.ano == ano);
    }
  
    if (especialidade) {
      resultado = resultado.filter(b => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }
  
    if (nome) {
      resultado = resultado.filter(n => n.nome.toLowerCase().includes(nome.toLowerCase()));
    }
  
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});


// rota de varinhas com filtro (query)
app.get('/varinhas', (req, res) => {
  const { material, nucleo, comprimento} = req.query;
  let resultado = varinhas;

  if (material) {
    resultado = resultado.filter(b => b.material.toLowerCase().includes(material.toLowerCase()));
  }
  if (nucleo) {
    resultado = resultado.filter(b => b.nucleo.toLowerCase().includes(nucleo.toLowerCase()));
  }

  if (comprimento) {
    resultado = resultado.filter(b => b.comprimento.toLowerCase().includes(comprimento.toLowerCase()));
  }

  res.status(200).json({
    total: resultado.length,
    data: resultado
  });
});


app.get('/pocoes', (req, res) => {
  const { nome, efeito} = req.query;
  let resultado = pocoes;

  if (nome) {
    resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
  }
  if (efeito) {
    resultado = resultado.filter(b => b.efeito.toLowerCase().includes(efeito.toLowerCase()));
  }
  res.status(200).json({
    total: resultado.length,
    data: resultado
  });
});

// Rota para listar bruxos com filtro (Query)
app.post("/bruxos",  (req,res) =>{
  const { nome, casa,ano,varinha,mascote,patrono,especialidade,vivo } = req.body;

  if (!nome || !casa) {
     return res.status(400).json({
      sucess:false,
      message :"nome e casa são obrigatorios para um bruxo!",
    });
  }

  const novoBruxo ={
    id: bruxos.length + 1,
    nome,
    casa: casa,
    ano:parseInt(ano),
    varinha:varinha,
    mascote,
    patrono,
    especialidade:especialidade || "ainda não atribuido!",
    vivo:vivo
}

app.post("/varinhas",  (req,res) =>{
  const { material, nucleo, comprimento } = req.body;

  if (!material || !nucleo || !comprimento) {
     return res.status(400).json({
      sucess:false,
      message :"material,nucleo e comprimento são obrigatorios para uma varinha!",
    });
  }

  const novaVarinha={
  id: varinhas.length + 1, 
  material:material,
  nucleo,
  comprimento
} 

//adicionar na lista
varinhas.push(novaVarinha);

res.status(201).json({
  sucess:true,
  message:"nova varinha adicionado a lista!",
  data: novaVarinha,
  });
})

//adicionar na lista
bruxos.push(novoBruxo);

res.status(201).json({
  sucess:true,
  message:"novo bruxo adicionado a hogwarts!",
  data: novoBruxo,
  });
})



// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});